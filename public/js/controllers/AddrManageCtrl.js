define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
    app.controller('AddrManageCtrl', ['$scope', '$rootScope', 'addrs', '$state', 'dcModel', 'toastr', function ($scope, $rootScope, addrs, $state, dcModel, toastr) {
    // 地址列表
    $scope.addrs = addrs.data;

    /*读取local中的user*/
    var user = storageUtil.local.getItem(storageUtil.KEYS.USER);

    $scope.event = {
      //跳转到新增页面
      toAddUI: function () {
        $state.go('app.add_new_addr');
      },
      toUpdateUI: function (addr) {
        $state.go('app.add_new_addr', { id: addr._id });
      },
      
      toDelete: function (addrId) {
        if (confirm('确认删除这条地址信息吗？')) {
          dcModel.deleteAddrById.del({ addrId: addrId }, function (data) {
            if (data.code == 0) {
              toastr.success('删除成功');
              //更新页面
              $scope.addrs.splice(index, 1);

              // $scope.event.initList();
            }
          });
        }
      },
      initList: function () {
        dcModel.getAddrsByUserId.get({ userId: user._id }, function (data) {
          if(data.code==0){
            $scope.addrs = addrs.data;
            console.log($scope.addrs);
          }
        })
      },
      /**
       * 去下单页面
       * @param {*} addr 
       */
      toOrderConfirm:function(addr){
        //保存
        storageUtil.session.setItem(storageUtil.KEYS.ORDER_ADDR, addr);
        //跳转下单页面
        $state.go('app.order_confirm');
      }
    }
  }])
});