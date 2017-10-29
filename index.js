let request = require('request');
const config = require('./config.js');
const mysql = require('mysql');
const connection = mysql.createConnection(config.rds);


const j = request.jar();
request = request.defaults({jar:j});
request('http://map.naver.com/', getData);
const localList = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];

function callJSONData({index, local}) {
	return new Promise(function(res, rej){
		request({
			url: encodeURI(`http://map.naver.com/search2/local.nhn?sm=hty&isFirstSearch=true&query=서울특별시+${local}+화장실&menu=location&page=${index}`),
			jar: j
		}, function (error, response, body) {
			if (error) throw rej();
			const data = JSON.parse(body), listMap = new Map();
			const list = data && data.result && data.result.site && data.result.site.list;
			list && list.forEach(item => listMap.set(item.id, item));
			res(listMap);
		});
	});
}

function * roofByIndex({index, local}){
	let flag = true;
	let totalList = new Map();
	while(flag){
		const list = yield callJSONData({index, local});
		if(list.size <= 1) return totalList;
		list.forEach((value, key) => totalList.set(key, value));
		console.log(index, ...list.keys());
		index++;
	}
}

function * roofByLocal(){
	let totalList = new Map();
	while(localList.length){
		const list = yield* roofByIndex({index:1, local:localList.shift()});
		list.forEach((value, key) => totalList.set(key, value));
	}
	return totalList;
}

function getData(){
	const iterator = roofByLocal();
	let ret;
	(function runNext(val) {
		ret = iterator.next(val);
		if (!ret.done) {
			ret.value.then(runNext).catch(e=>console.log(e));
		} else {
			const data = [...ret.value.values()];

			connection.connect();
			const sql = `INSERT INTO toilet_info (n_id, name, tel, category, address, roadAddress, abbrAddress, thumUrl, type, lat, lng, itemLevel, homePage, description)
          VALUES
          ${data.reduce((a, b, i) => {
				return a+`${i !== 0 ? `,`:``}("${b.id}", "${b.name}", "${b.tel}", "${b.category.toString()}", "${b.address}", "${b.roadAddress}", "${b.abbrAddress}", "${b.thumUrl}", "${b.type}", ${b.y}, ${b.x}, "${b.itemLevel}", "${b.homePage}", "${b.description}")\n`
			}, '')}
       ;`;
			connection.query(sql,
				function (error, results, fields) {
					if (error) throw error;
					console.log('The solution is: ', results);
				}
			);

			connection.end();
		}
	})();
}
