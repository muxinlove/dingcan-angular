define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('ChooseCoordinateCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'mapService', function ($scope, $rootScope, $http, $state, $stateParams, mapService) {
    var map;
    var locAddr;

    // jsonp形式 引用百度地图app
    mapService.loadMapAPI('cc_main', 'init');

    // 添加全局函数
    window.init = function () {
      map = new BMap.Map("cc_map");  // 创建Map实例

      var lng = '116.404';
      var lat = '39.915';
      /*从session中读取的跳转之前的地址*/
      var inputAddr = storageUtil.session.getItem(storageUtil.KEYS.INPUT_ADDR);
      locAddr = storageUtil.session.getItem(storageUtil.KEYS.LOC_ADDR);
      var addr = inputAddr || locAddr;

      if (addr) {
        lng = addr.lng;
        lat = addr.lat;
        var point = new BMap.Point(lng, lat); // 创建点坐标
        map.centerAndZoom(point, 15);
        showList();
      } else {
        // 浏览器定位
        mapService.getCurrentAddr().then(function (addr) {
          var point = new BMap.Point(addr.lng, addr.lat); // 创建点坐标 
          map.centerAndZoom(point, 15);
          showList();
        });
      }

      map.setCurrentCity("上海");

      // 监听事件
      // 拖拽结束
      map.addEventListener('dragend', showList);
      // 缩放结束
      map.addEventListener('zoomend', showList);

    }
    $scope.event = {
      search: function () {
        var name = $scope.seachName && $scope.seachName.trim();
        if (name) {
          mapService.getPointByAddr(name).then(function (point) {
            map.centerAndZoom(point, 15);
            showList();
          })
        }
      },
      selectAddr: function (addr) {
        if (locAddr) {
          addr.name = addr.address;
          storageUtil.session.setItem(storageUtil.KEYS.CURRENT_ADDR, addr);
          //跳转
          $state.go('app.home');
          return;
        }
        // 將选择的地址添加到session中
        storageUtil.session.setItem(storageUtil.KEYS.MAP_ADDR, addr);
        $state.go('app.add_new_addr', { id: $stateParams.id || 0 });
      }
    }

    function showList() {
      // 获取中心点
      var cPoint = map.getCenter();
      mapService.getAroundAddrs(cPoint).then(function (mapAddrs) {
        $scope.mapAddrs = mapAddrs;
      })
    }

  }])
});