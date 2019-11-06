/** 
 * 前端路由配置模块
*/

define([
  'app'
], function (app) {
  'use strict';

  return app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/home");
    $stateProvider
      .state('app',
        {
          url: '/app',
          templateUrl: 'js/templates/app.html',
        })
      .state('app.login',
        {
          url: '/login',
          templateUrl: 'js/templates/login.html',
          controller: 'LoginCtrl',
          resolve: {
            ctrl: loadJs(['LoginCtrl'])
          },
          pageTitle: '登 陆'
        })
      .state('app.home',
        {
          url: '/home',
          templateUrl: 'js/templates/home.html',
          controller: 'HomeCtrl',
          pageTitle: '首 页'
        })
      .state('app.add_new_addr',
        {
          url: '/add_new_addr',
          templateUrl: 'js/templates/addNewAddress.html',
          controller: 'AddNewAddrCtrl',
          pageTitle: '添加/更新地址'
        })
      .state('app.add_manage',
        {
          url: '/add_manage',
          templateUrl: 'js/templates/addrManage.html',
          controller: 'AddrManageCtrl',
          pageTitle: '地址管理'
        })
      .state('app.choose_coordinate',
        {
          url: '/choose_coordinate',
          templateUrl: 'js/templates/chooseCoordinate.html',
          controller: 'ChooseCoordinateCtrl',
          pageTitle: '地图选择地址'
        })
      .state('app.feedback',
        {
          url: '/feedback',
          templateUrl: 'js/templates/feedback.html',
          controller: 'FeedbackCtrl',
          pageTitle: '意见反馈'
        })
      .state('app.location_addr',
        {
          url: '/location_addr',
          templateUrl: 'js/templates/locationAdd.html',
          controller: 'LocationAddrCtrl',
          pageTitle: '定位当前地址'
        })

      .state('app.order_confirm',
        {
          url: '/order_confirm',
          templateUrl: 'js/templates/orderConfirm.html',
          controller: 'orderConfirmCtrl',
          pageTitle: '订单确认'
        })
      .state('app.order_detail',
        {
          url: '/order_detail',
          templateUrl: 'js/templates/orderDetail.html',
          controller: 'OrderDetailCtrl',
          pageTitle: '订单详情'
        })
      .state('app.order_list',
        {
          url: '/order_list',
          templateUrl: 'js/templates/orderList.html',
          controller: 'OrderListCtrl',
          pageTitle: '订单列表'
        })
      .state('app.personal_center',
        {
          url: '/personal_center',
          templateUrl: 'js/templates/PersonalCenter.html',
          controller: 'PersonalCenterCtrl',
          pageTitle: '个人中心'
        });

    // 延迟加载方法
    function loadJs(files) {
      return ['$ocLazyLoad', function ($ocLazyLoad) {
        for (let index = 0; index < files.length; index++) {
          files[index] = 'js/controllers/' + files[index] + '.js';
        }
        return $ocLazyLoad.load(files);
      }]
    };

  }])
});