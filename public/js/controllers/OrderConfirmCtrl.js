define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('OrderConfirmCtrl', ['$scope', '$rootScope', '$state', 'dcModel', '$filter', '$timeout', 'toastr', function ($scope, $rootScope, $state, dcModel, $filter, $timeout, toastr) {



    //检查用户是否登录过
    var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
    if (user == null) {
      alert('请先登录')
      $state.go(app.login);
      return;
    }

    //初始化order
    $scope.order = {};

    // 读取session中的地址
    var orderAddress = storageUtil.session.getItem(storageUtil.KEYS.ORDER_ADDR);
    if (orderAddress) {
      $scope.orderAddress = orderAddress;
    } else {
      dcModel.getDefaultAddress.get({ userId: user._id }, function (data) {
        if (!data.code) {
          $scope.orderAddress = data.data;
        }
      })
    }

    /*
     初始化时间   value="2019-11-18 11:55" text="10:55"
    */
    initTimes();

    function initTimes() {
      var times = [];
      // 获取当前时间
      var startTime = new Date().getTime();
      // 配送时间 1小时
      var peisongTime = 60 * 60 * 1000;
      // 配送的间隔时间 15分钟
      var intervalTime = 15 * 60 * 1000;
      times.push({
        value: $filter('date')(startTime + peisongTime, 'yyyy-MM-dd HH:mm'),
        text: '立即配送'
      })

      // 结束配送时间 晚上10点
      var endTime = new Date($filter('date')(startTime, 'yyyy-MM-dd') + ' 22:00').getTime();

      while (startTime <= endTime) {
        startTime += intervalTime;
        if (startTime > endTime) {
          break;
        }
        times.push({
          value: $filter('date')(startTime + peisongTime, 'yyyy-MM-dd HH:mm'),
          text: $filter('date')(startTime, 'HH:mm')
        })
      }
      $scope.times = times;
    }

    // 读取购物车数据
    var cart = storageUtil.session.getItem(storageUtil.KEYS.CART);
    $scope.cart = cart;

    $scope.event = {
      /**
       * 下单
       */
      submit: function () {
        /*order = {
                   "user_id": "576bbe0aa1d183c42c06c08e",
  
                   "contactor": "张晓飞",
                   "address": "龙隆昌科技楼",
                   "phone": "13716962779",
                   "doorplate": "3层301",
  
                   "total_money": 56,
                   "peisongfei": 0,
  
                   "remark": "加一份米饭",
                   "arrive_time": "2016-6-23 20:14",
  
                   "detail": "{\"data\":{\"rstId\":1772,\"money\":56,\"meals\":[{\"mealName\":\"藜麦牛油果沙拉\",\"pictures\":\"%2Fsource%2Fassets%2Fimages%2Fimg%2F3.png\",\"num\":1,\"price\":\"23\"},{\"mealName\":\"牛油果三文鱼沙拉\",\"pictures\":\"%2Fsource%2Fassets%2Fimages%2Fimg%2F5.png\",\"num\":1,\"price\":\"33\"}]}}"
               }*/
        var obj_detail = {
          rstId: $scope.cart.rstId,
          money: $scope.cart.totalPrice + $scope.cart.songcanfei,
          meals: $scope.cart.meals
        };

        var params = {
          user_id: user._id,
          contactor: $scope.orderAddress.contactor,
          address: $scope.orderAddress.address,
          phone: $scope.orderAddress.phone,
          doorplate: $scope.orderAddress.doorplate,
          total_money: $scope.cart.totalPrice,
          peisongfei: $scope.cart.songcanfei,
          remark: $scope.order.remark,
          arrive_time: $scope.order.arrive_time,
          detail: JSON.stringify(obj_detail)
        };
        console.log('params', params);

        dcModel.addOrder.post(params, function (data) {
          if (!data.code) {
            toastr.success('下单成功');

            storageUtil.session.removeItem(storageUtil.KEYS.CART);
            storageUtil.session.removeItem(storageUtil.KEYS.ORDER_ADDR);

            $timeout(function () {
              $state.go('app.order_detail', { id: data.data._id });
            }, 1000);
          }
        })
      }
    };

  }])
});