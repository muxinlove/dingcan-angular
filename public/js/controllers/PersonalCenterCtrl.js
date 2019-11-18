define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('PersonalCenterCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
    $scope.user = user || {};
  }])
});