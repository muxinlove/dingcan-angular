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
      };

      function buildUrl(url) {
        return $window.location.origin + '/' + url;
      }
    }
});