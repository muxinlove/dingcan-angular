/**
 * 主路口js
 */
require.config({
  // 基本路径
  base: 'js/',
  // 映射模块
  paths: {
    // libs模块
    'angular': 'libs/angular',
    'angular-messages': 'libs/angular-messages',
    'angular-ui-router': 'libs/angular-ui-router',
    'ocLazyLoad': 'libs/ocLazyLoad.min',
    'angular-resource': 'libs/angular-resource.min',

    // controller模块
    'app': 'controllers/app',
    'HomeCtrl': 'controllers/HomeCtrl',
    'AddrManageCtrl': 'controllers/AddrManageCtrl',
    'AddNewAddrCtrl': 'controllers/AddNewAddrCtrl',
    'ChooseCoordinateCtrl': 'controllers/ChooseCoordinateCtrl',
    'FeedbackCtrl': 'controllers/FeedbackCtrl',
    'LocationAddrCtrl': 'controllers/LocationAddrCtrl',
    'LoginCtrl': 'controllers/LoginCtrl',
    'OrderListCtrl': 'controllers/OrderListCtrl',
    'OrderDetailCtrl': 'controllers/OrderDetailCtrl',
    'OrderConfirmCtrl': 'controllers/OrderConfirmCtrl',
    'PersonalCenterCtrl': 'controllers/PersonalCenterCtrl',

    // routers
    'appRoute': 'routes/appRoute',

    // services
    'URL': 'services/url.service',
    'buildModel': 'services/build-model.service',

    // models
    'loginModel': 'models/login.model'
  },
  // 非AMD的模块
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-messages': {
      exports: 'angular-messages',
      deps: ['angular']
    },
    'angular-ui-router': {
      exports: 'angular-ui-router',
      deps: ['angular']
    },
    'ocLazyLoad': {
      exports: 'ocLazyLoad',
      deps: ['angular']
    },
    'angular-resource': {
      exports: 'angular-resource',
      deps: ['angular']
    }
  }
})

// 加载模块 启动angular
require([
  'angular',
  'angular-messages',
  'angular-ui-router',
  'ocLazyLoad',
  'angular-resource',

  // controller模块
  'app',
  'HomeCtrl',
  'AddrManageCtrl',
  'AddNewAddrCtrl',
  'ChooseCoordinateCtrl',
  'FeedbackCtrl',
  'LocationAddrCtrl',
  'LoginCtrl',
  'OrderListCtrl',
  'OrderDetailCtrl',
  'OrderConfirmCtrl',
  'PersonalCenterCtrl',

  // routers
  'appRoute',

  // services
  'URL',
  'buildModel',

  // models
  'loginModel'
],
  function (angular) {
    // 启动angular
    angular.bootstrap(document, ['dcApp']);
  })