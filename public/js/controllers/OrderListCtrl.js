define([
  'app',
], function (app) {
  'use strict';
  app.controller('OrderListCtrl', ['$scope', '$rootScope', 'orders', '$state', function ($scope, $rootScope, orders, $state) {
    $scope.orders = orders.data;
    $scope.event = {
      toDetail: function (orderId) {
        $state.go('app.order_detail', { id: orderId });
      }
    }
  }])
});