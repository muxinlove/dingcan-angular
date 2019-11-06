/**
 * app 应用模块
 */
define(['angular'], (angular) => {
  return angular.module('dcApp', ['ui.router', 'ngMessages', 'oc.lazyLoad', 'ngResource'])
    .run(($rootScope, $transitions, $state) => {
      // $stateChangeCancel -> TransitionService.onStart
      // $stateChangeError -> TransitionService.onStart and Transition.promise, or Transition.onError
      // $stateChangeStart -> TransitionService.onStart
      // $stateChangeSuccess -> TransitionService.onStart and Transition.promise, or Transition.onSuccess
      // $stateNotFound -> StateService.onInvalid

      // $transitions.onStart({}, (transition) => {

      // })

      $transitions.onSuccess({}, (transition) => {
        $rootScope.appTitle = $state.current.pageTitle;
      })
    });
});