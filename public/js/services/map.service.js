/*
 * 与地图相关的mapService模块 
 */
define([
	'app',
], function (app) {
	'use strict';
	app.factory("mapService", ['$http', '$q', function ($http, $q) {
		/**
		 * 引入地图api
		 * @param {显示地图的容器id} containerId
		 * @param {回调函数} callback 
		 */
		function loadMapAPI(containerId, callback) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://api.map.baidu.com/api?v=2.0&ak=P4dTDRZEnFpdkvariAHELPnmHHRLk4sc&callback=" + callback;
			document.getElementById(containerId).appendChild(script);
		}

		/**
		 * 获取坐标点附近的地址列表
		 * @param {坐标} point 
		 */
		function getAroundAddrs(point) {
			var defer = $q.defer();
			//根据cPoint得到附近的多个地址的列表
			var url = 'http://api.map.baidu.com/geocoder/v2/?ak=P4dTDRZEnFpdkvariAHELPnmHHRLk4sc&callback=JSON_CALLBACK&location=' + point.lat + ',' + point.lng + '&output=json&pois=1';
			$http.jsonp(url)
				.success(function (data) {
					// console.log(data);
					var result = data.result;
					var cityId = result.cityCode;
					var mapAddrs = [];
					result.pois.forEach(function (item) {
						var address = item.name;
						var lat = item.point.y;
						var lng = item.point.x;
						mapAddrs.push({ address, lat, lng, cityId })
					})
					// $scope.mapAddrs = mapAddrs;
					defer.resolve(mapAddrs);
				})
				.error(function () {
					alert('请求地图地址失败')
				})
			return defer.promise;
		}

		/*
		* 根据地址名称得到对应的坐标点
		* 正解析
		* */
		function getPointByAddr(name) {
			var defer = $q.defer()
			// 创建地址解析器实例     
			var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上，并调整地图视野    
			myGeo.getPoint(name, function (point) {
				if (point) {
					defer.resolve(point);
				}
			}, "上海市");
			return defer.promise;
		}


		/*
		* 得到当前的坐标
		* 逆解析
    * */
		function getCurrentAddr() {
			var defer = $q.defer()
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function (r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					var point = r.point;

					var geoc = new BMap.Geocoder();
					geoc.getLocation(point, function (rs) {
						var addComp = rs.addressComponents;
						var name = addComp.city + addComp.district + addComp.street + addComp.streetNumber;
						defer.resolve({
							name: name,
							lng: point.lng,
							lat: point.lat
						});
					});
				}
				else {
					alert('获取定位失败');
				}
			}, { enableHighAccuracy: true })
			return defer.promise;
		}

		/*
		通过关键词搜索附近地址
		 */
		function getAddrsByText(text) {
			var defer = $q.defer();
			var url = 'http://api.map.baidu.com/place/v2/search?q=' + text + '&region=上海&output=json&' +
				'ak=P4dTDRZEnFpdkvariAHELPnmHHRLk4sc&callback=JSON_CALLBACK';
			$http.jsonp(url)
				.success(function (data) {
					defer.resolve(data.results)
				})
				.error(function () {
					alert('搜索地址失败')
				})
			return defer.promise;
		}


		return {
			loadMapAPI,
			getAroundAddrs,
			getPointByAddr,
			getCurrentAddr,
			getAddrsByText
		}
	}]);
});