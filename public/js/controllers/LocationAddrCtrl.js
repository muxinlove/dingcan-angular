define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('LocationAddrCtrl', ['$scope', '$rootScope', 'addrs', 'mapService', '$state', function ($scope, $rootScope, addrs, mapService, $state) {
    // 读取session的当前地址
    var currentAddr = storageUtil.session.getItem(storageUtil.KEYS.CURRENT_ADDR);
    $scope.currentAddr = currentAddr;

    //保存到session中
    storageUtil.session.setItem(storageUtil.KEYS.LOC_ADDR, $scope.currentAddr);

    // 当前收货地址
    $scope.addrs = addrs.data;

    // 搜索框搜索
    $scope.showSearch = false;
    $scope.isOpsing = false;
    $scope.event = {
      search: function () {
        var text = $scope.searchText.trim();
        if (text) {
          $scope.showSearch = true;
          getAddrsByText(text);
        }
      },
      toHome(address) {
        var addr = {
          name: address.name || address.address,
          lat: address.lat || address.location.lat,
          lng: address.lng || address.location.lng
        }
        //保存searchAddr
        storageUtil.session.setItem(storageUtil.KEYS.CURRENT_ADDR, addr);
        $state.go('app.home');
      },
      relocation() {
        // 状态取反
        $scope.isOpsing = true;
        // 定位获取位置 && 获取附近地址
        mapService.loadMapAPI('locDiv', 'initMap');
        window.initMap = function () {
          mapService.getCurrentAddr()
            .then(function (address) {
              $scope.currentAddr = address;
              //保存到session中
              storageUtil.session.setItem(storageUtil.KEYS.CURRENT_ADDR, address);

              mapService.getAroundAddrs($scope.currentAddr)
                .then(function (aroundAddrs) {
                  $scope.aroundAddrs = aroundAddrs;
                  $scope.isPosing = false;
                })
            })
        }
      },
      cancelSearch: function() {
        $scope.searchText = '';
        $scope.showSearch = false;
        $scope.searchAddrs = [];
      }
    }

    function getAddrsByText(text) {
      mapService.getAddrsByText(text).then(function (data) {
        $scope.searchAddrs = data;
      })
    }
  }])
});