define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
    app.controller('FeedbackCtrl', ['$scope', '$rootScope', 'dcModel', '$state', 'toastr', function ($scope, $rootScope, dcModel, $state, toastr) {

    var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
    if (!user) {
      $state.go('app.login');
      return;
    }

    $scope.feedback = {
      user_id: user._id,
      phone: user.phone
    };
    $scope.event = {
      addFeedback: function () {
        dcModel.addFeedback.post($scope.feedback, function (data) {
          if (data.code == 0) {
            toastr.success('吐槽成功');
          }
        })
      }
    }
  }])
});