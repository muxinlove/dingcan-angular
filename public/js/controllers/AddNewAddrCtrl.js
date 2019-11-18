define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('AddNewAddrCtrl', ['$scope', '$rootScope', 'addr', 'dcModel', 'toastr', '$state', '$timeout', '$stateParams', function ($scope, $rootScope, addr, dcModel, toastr, $state, $timeout, $stateParams) {
    if (addr) {
      $rootScope.appTitle = '更新地址';
      $scope.address = addr.data;
    } else {
      $rootScope.appTitle = '新增地址';
      $scope.address = {};

      /*读取local中的user*/
      var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
      $scope.address.userId = user._id;
    }

    //读取session的当前地址
    var inputAddr = storageUtil.session.getItem(storageUtil.KEYS.INPUT_ADDR);
    if (inputAddr) {
      $scope.address = inputAddr;
      storageUtil.session.removeItem(storageUtil.KEYS.INPUT_ADDR)
    } 

    // 读取session中的地图地址信息
    var mapAddr = storageUtil.session.getItem(storageUtil.KEYS.MAP_ADDR);
    if (mapAddr) {
      $scope.address.address = mapAddr.address;
      $scope.address.lat = mapAddr.lat;
      $scope.address.lng = mapAddr.lng;
      $scope.address.cityId = mapAddr.cityId;

      storageUtil.session.removeItem(storageUtil.KEYS.MAP_ADDR);
    }

    $scope.event = {
      toAddrMap: function () {
        // $scope.address.address = '龙隆昌科技楼';
        // $scope.address.lat = '39.99392711698915';
        // $scope.address.lng = '116.32432928208593';
        // $scope.address.cityId = '113';

        //保存当前地址
        storageUtil.session.setItem(storageUtil.KEYS.INPUT_ADDR, $scope.address)
        $state.go('app.choose_coordinate', { id: $stateParams.id || 0 });
      },
      setSex: function (sex) {
        $scope.address.sex = sex;
      },
      save: function () {
        if (addr) {
          dcModel.updateAddr.put($scope.address, function (data) {
            if (data.code == 0) {
              toastr.success('更新成功');
              $timeout(function () {
                $state.go('app.addr_manage');
              }, 1000);
            }
          })
        } else {
          dcModel.addAddr.post($scope.address, function (data) {
            if (data.code == 0) {
              toastr.success('新增成功');
              $timeout(function () {
                $state.go('app.addr_manage');
              }, 1000);
            }
          })
        }
      }
    };

  }])
});