define([
  'app',
], function (app) {
  'use strict';
  app.factory('dcModel', dcModel);
  dcModel.$inject = ['buildModel'];
  function dcModel(buildModel) {
    return {
      // 登陆
      'login': buildModel('login'),
      'sendcode': buildModel('sendcode'),
      // 意见反馈
      'addFeedback': buildModel('addFeedback'),
      // 地址
      'getAddrsByUserId': buildModel('getAddrsByUserId'),
      'getAddrByAddrId': buildModel('getAddrByAddrId'),
      'addAddr': buildModel('addAddr'),
      'updateAddr': buildModel('updateAddr'),
      'deleteAddrById': buildModel('deleteAddrById'),
      // 首页
      'getBanners': buildModel('getBanners'),
      'getData': buildModel('getData'),
      // 订单
      'getDefaultAddress':buildModel('getDefaultAddress'),
      'getOrderById': buildModel('getOrderById'),
      'addOrder': buildModel('addOrder'),
    }
  }
});