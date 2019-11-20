define([
  'app',
], function (app) {
  'use strict';
  app.factory('URL', URL);
  URL.$inject = ['$window'];
  function URL($window) {
    return {
      // 登陆
      'login': buildUrl('login'),
      'sendcode': buildUrl('sendcode'),

      // 意见反馈
      'addFeedback': buildUrl('feedback'),

      // 地址
      'getAddrsByUserId': buildUrl('getAddrsByUserId'),
      'getAddrByAddrId': buildUrl('getAddrByAddrId'),
      'addAddr': buildUrl('insertAddr'),
      'updateAddr': buildUrl('updateAddr'),
      'deleteAddrById': buildUrl('deleteAddrById'),

      // 首页
      'getBanners': buildUrl('index/banners'),
      'getData': buildUrl('index/data'),

      // 订单
      'getDefaultAddress': buildUrl('order/getDefaultAddress'),
      'addOrder': buildUrl('order/createOrder'),
      'getOrderById': buildUrl('order/detail'),
      'getOrdersByUserId': buildUrl('order/list'),
    };

    function buildUrl(url) {
      return $window.location.origin + '/' + url;
    }
  }
});