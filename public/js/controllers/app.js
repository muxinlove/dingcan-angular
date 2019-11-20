/**
 * app 应用模块
 */
define(['angular'], function (angular) {
  angular.module('moduleList', [
    'ngAnimate',
    'ngMessages',
    'oc.lazyLoad',
    'ngResource',
    'toaster',
    'cfp.loadingBar',
    'ui.router',
  ])
  var app = angular.module('dcApp', ['moduleList']);

  app.run(function ($rootScope, $transitions, $state) {
    // $stateChangeCancel -> TransitionService.onStart
    // $stateChangeError -> TransitionService.onStart and Transition.promise, or Transition.onError
    // $stateChangeStart -> TransitionService.onStart
    // $stateChangeSuccess -> TransitionService.onStart and Transition.promise, or Transition.onSuccess
    // $stateNotFound -> StateService.onInvalid

    // $transitions.onStart({}, (transition) => {

    // })

    $transitions.onSuccess({}, function (transition) {
      $rootScope.appTitle = $state.current.pageTitle;
    })
  });

  app.config(['$httpProvider', 'cfpLoadingBarProvider', 'toasterConfig', function ($httpProvider, cfpLoadingBarProvider, toasterConfig) {

    // loadingbar
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.includeSpinner = true;

    $httpProvider.interceptors.push(interceptors);

    // toastr
    angular.extend(toasterConfig, {
      "close-button": false,
      "position-class": "toast-top-center",
      "time-out": 1000
    });
  }]);

  interceptors.$inject = ['$q', 'toastr', '$window', '$timeout', 'cfpLoadingBar', '$rootScope'];

  function interceptors($q, toastr, $window, $timeout, cfpLoadingBar, $rootScope) {
    var isShowError = true;

    function showError(msg) {
      if (isShowError) {
        toastr.error(msg);
        isShowError = false;
        timeoutShowError();
        cfpLoadingBar.complete();
      }
    }
    function timeoutShowError() {
      $timeout(function () {
        isShowError = true;
      }, 1000);
    }
    var out = false;
    return {
      request: function (config) {
        // 全局ajax 超时时间
        config.timeout = 100000;
        return config;
      },
      response: function (config) {
        if (config.data.code == 1) {
          showError(config.data.msg || '接口返回错误');
        }
        return config;
      },
      responseError: function (rejection) {
        // if (rejection.status === 401) {
        //   if (!out) {
        //     out = true;
        //     window.location.href = "/app/home?t=" + Math.random();
        //     return false;
        //   }
        // }
        // if (rejection.status === 404) {
        //   showError('找不到指定的url');
        // } else if (rejection.status >= 500 || rejection.status == 409) {
        //   if (!(rejection.config.data && rejection.config.data.noShowError)) {
        //     showError(rejection.data.data.msg);
        //   }
        // }
        // else if (rejection.status >= 400 && rejection.data && rejection.data.data) {
        //   if (rejection.data.data.msg) {
        //     showError(rejection.data.data.msg);
        //   }
        //   if (rejection.data.data.error) {
        //     showError(rejection.data.data.error);
        //   }
        // }
        // else if (rejection.status == -1) {
        //   showError('连接不上服务器，请检查网络或联系管理员。');
        // }
        var defered = $q.defer();
        defered.reject(rejection.data);
        return defered.promise;
      }
    }
  }

  return app;

});