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
    }
  }
})

// 加载模块 启动angular
require([
  'angular',
  'angular-messages',
  'angular-ui-router'
],
  function (angular) {
    // 启动angular
    angular.bootstrap(document, ['dcApp']);
  })