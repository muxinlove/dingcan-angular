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
    'angular-animate': 'libs/angular-animate.min',
    'angular-ui-router': 'libs/angular-ui-router',
    'ocLazyLoad': 'libs/ocLazyLoad.min',
    'angular-resource': 'libs/angular-resource.min',
    'toaster': 'libs/angular-toaster/toaster.min',
    'loadingBar': 'libs/loadingbar/loading-bar',
    'swiper' : 'libs/swiper/swiper.min',

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
    'toastr': 'services/toastr.service',
    'tools': 'services/tools.service',
    'buildPromise': 'services/build-promise.service',
    'mapService': 'services/map.service',

    // models
    'dcModel': 'models/dc.model',

    // utils
    'storageUtil':'utils/storageUtil'
  },
  map: {
    '*': {
      'css': 'libs/require-css/css.min'
    }
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
    'angular-animate': {
      exports: 'angular-animate',
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
    },
    'toaster': {
      exports: 'toaster',
      deps: [
        'angular',
        'angular-animate',
        'css!libs/angular-toaster/toaster.min.css'
      ]
    },
    'loadingBar': {
      exports: 'loadingBar',
      deps: [
        'css!libs/loadingbar/loading-bar.css'
      ]
    },
    'swiper': {
      exports: 'swiper',
      deps: [
        'css!libs/swiper/swiper.min.css'
      ]
    }
  }
})

// 加载模块 启动angular
require([
  'angular',
  'angular-messages',
  'angular-animate',
  'angular-ui-router',
  'ocLazyLoad',
  'angular-resource',
  'toaster',
  'loadingBar',
  'swiper',

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
  'toastr',
  'tools',
  'buildPromise',
  'mapService',

  // models
  'dcModel',

  // utils
  'storageUtil'
],
  function (angular) {
    // 启动angular
    angular.bootstrap(document, ['dcApp']);
  })