define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('LoginCtrl', ['$scope', '$rootScope', '$interval', 'dcModel', 'toastr', '$state', '$timeout', function ($scope, $rootScope, $interval, dcModel, toastr, $state, $timeout) {
    //初始化数据
    $scope.btnText = '获取验证码';
    $scope.timing = false; // 是否正在计时

    $scope.event = {
      startTime: function () {
        if ($scope.timing) return;
        // 检查手机是否合法 不合法 则提示 
        if ($scope.loginForm.phone.$invalid) {
          $scope.loginForm.phone.$dirty = true;
          return;
        }
        $scope.timing = true;
        let time = 108;
        $scope.btnText = `${time}s重新获取`;
        let stop = $interval(function () {
          time--;
          //不断改变btnText
          $scope.btnText = `${time}s重新获取`;
          //当计时完成，停止计时，更新btnText
          if (time === 0) {
            //更新btnText
            $scope.btnText = '获取验证码';
            //重置状态
            $scope.timing = false;
            //停止计时器
            $interval.cancel(stop);
          }
        }, 1000);

        // 请求验证码
        dcModel.sendcode.get({ phone: $scope.user.phone });
      },
      login: function () {
        // 校验表单
        if ($scope.loginForm.$invalid) {
          $scope.loginForm.$dirty = true;
          return;
        }
        // 提交表单
        dcModel.login.post({
          phone: $scope.user.phone,
          code: $scope.user.code
        }, function (data) {
          if (data.code == 0) {
            var user = data.data;
            toastr.success(user.phone + '登陆成功');
            // user存储到localStorage中
            storageUtil.local.setItem(storageUtil.KEYS.USER, user);
            //跳转到home
            $timeout(function () {
              $state.go('app.home');
            }, 1000);
          }
        });
      }
    }

  }])
});