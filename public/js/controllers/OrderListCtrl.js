define([
  'app',
], function (app) {
  'use strict';
    app.controller('OrderListCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.appTitle = '订单列表'
  }])
});