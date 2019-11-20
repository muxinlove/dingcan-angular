/** 
 * 前端路由配置模块
*/

define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
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
          // resolve: {
          //   ctrl: loadJs(['LoginCtrl'])
          // },
          pageTitle: '登 陆'
        })
      .state('app.home',
        {
          url: '/home',
          templateUrl: 'js/templates/home.html',
          controller: 'HomeCtrl',
          pageTitle: '首 页',
          resolve: {
            banners: ['dcModel', 'buildPromise', function (dcModel, buildPromise) {
              return buildPromise(dcModel.getBanners);
            }],
            data: ['dcModel', 'buildPromise', function (dcModel, buildPromise) {
              return buildPromise(dcModel.getData);
            }]
          },
        })
      .state('app.add_new_addr',
        {
          url: '/add_new_addr?id',
          templateUrl: 'js/templates/addNewAddr.html',
          controller: 'AddNewAddrCtrl',
          pageTitle: '添加/更新地址',
          resolve: {
            addr: ['dcModel', 'buildPromise', '$stateParams', function (dcModel, buildPromise, $stateParams) {
              if ($stateParams.id && $stateParams.id.length > 1) {
                return buildPromise(dcModel.getAddrByAddrId, { addrId: $stateParams.id });
              } else {
                return null;
              }
            }]
          },
        })
      .state('app.addr_manage',
        {
          url: '/addr_manage',
          templateUrl: 'js/templates/addrManage.html',
          controller: 'AddrManageCtrl',
          pageTitle: '地址管理',
          resolve: {
            addrs: ['dcModel', 'buildPromise', function (dcModel, buildPromise) {
              var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
              return buildPromise(dcModel.getAddrsByUserId, { userId: user._id });
            }]
          },
        })
      .state('app.choose_coordinate',
        {
          url: '/choose_coordinate?id',
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
          templateUrl: 'js/templates/locationAddr.html',
          controller: 'LocationAddrCtrl',
          pageTitle: '定位当前地址',
          resolve: {
            addrs: ['dcModel', 'buildPromise', '$state', function (dcModel, buildPromise, $state) {
              var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
              if (user && user._id) {
                return buildPromise(dcModel.getAddrsByUserId, { userId: user._id });
              } else {
                $state.go('app.login');
                return false;
              }
            }]
          }
        })

      .state('app.order_confirm',
        {
          url: '/order_confirm',
          templateUrl: 'js/templates/orderConfirm.html',
          controller: 'OrderConfirmCtrl',
          pageTitle: '订单确认',
        })
      .state('app.order_detail',
        {
          url: '/order_detail?id',
          templateUrl: 'js/templates/orderDetail.html',
          controller: 'OrderDetailCtrl',
          pageTitle: '订单详情',
          resolve: {
            order: ['dcModel', 'buildPromise', '$stateParams', function (dcModel, buildPromise, $stateParams) {
              return buildPromise(dcModel.getOrderById, { id: $stateParams.id });
            }]
          }
        })
      .state('app.order_list',
        {
          url: '/order_list',
          templateUrl: 'js/templates/orderList.html',
          controller: 'OrderListCtrl',
          pageTitle: '订单列表',
          resolve: {
            orders: ['dcModel', 'buildPromise', function (dcModel, buildPromise) {
              var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
              return buildPromise(dcModel.getOrdersByUserId, { id: user._id });
            }]
          }
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