# ddong119
화장실 데이터 크롤링


## document
- https://github.com/bda-research/node-crawler
- https://blog.hypriot.com/getting-started-with-docker-on-your-arm-device/


### Packages
- request : http 요청을 할 수있는 간단한 패키지. 가상 웹 브라우저를 실행시켜 줌.

### firebase real time DB
- npm install firebase --save 

### Sample Data(Naver)

```json
{
    "index": "0",
    "rank": "1",
    "id": "s38742570",
    "name": "쌈지길 지하1층 개방화장실",
    "tel": "",
    "isCallLink": false,
    "virtualTel": "",
    "ppc": "0",
    "category": [ "시설,건물", "쇼핑,편의시설" ],
    "address": "서울특별시 종로구 관훈동 38 ",
    "roadAddress": "서울특별시 종로구 인사동길 44 쌈지길",
    "abbrAddress": "관훈동 38",
    "display": "쌈지길 지하1층 개방<b>화장실</b>",
    "telDisplay": "",
    "ktCallMd": "8fab7d1e86db0298dd3ea6c82f054f78",
    "coupon": "0",
    "thumUrl": null,
    "type": "s",
    "isSite": "1",
    "posExact": "1",
    "x": "126.9848653",
    "y": "37.5742877",
    "itemLevel": "12",
    "streetPanorama": {
        "id": "s2oSr8DmzUAJkpBQ0vqiqg==",
        "pan": "157.60",
        "tilt": "0.00",
        "lng": "126.9848001",
        "lat": "37.5744453",
        "fov": "120"
    },
    "skyPanorama": null,
    "insidePanorama": null,
    "interiorPanorama": null,
    "indoorPanorama": null,
    "theme": null,
    "poiInfo": {
        "road": {
            "poiShapeType": "1",
            "shapeKey": null,
            "boundary": null,
            "detail": null
        },
        "hasRoad": false,
        "land": null,
        "hasLand": false,
        "polygon": null,
        "hasPolygon": false
    },
    "homePage": "",
    "description": "",
    "entranceCoords": null,
    "isPollingPlace": false,
    "bizhourInfo": null,
    "menuInfo": null,
    "petrolInfo": null,
    "couponUrl": null,
    "couponUrlMobile": null,
    "hasCardBenefit": false,
    "indoor": {
        "floor": "0",
        "underGmid": "0",
        "underMid": "0"
    },
    "indoorMapInfo": null,
    "x1": null,
    "x2": null,
    "menuExist": "0",
    "hasNaverBooking": false,
    "naverBookingUrl": "",
    "hasBroadcastInfo": false,
    "broadcastInfo": {
        "name": null,
        "menu": null
    },
    "shopWindowInfo": null,
    "hasNPay": false,
    "distance": "481.42"
}
```

Infra : raspberry PI 3
Container : Dcoker
