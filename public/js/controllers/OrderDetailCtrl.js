define([
  'app',
], function (app) {
  'use strict';
    app.controller('OrderDetailCtrl', ['$scope', '$rootScope', 'order',function ($scope, $rootScope, order) {
      order.data.detail = JSON.parse(order.data.detail);
      $scope.order = order.data;
  }])
});