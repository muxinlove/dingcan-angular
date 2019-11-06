define([
  'app',
], function (app) {
  'use strict';
  app.factory('loginModel', loginModel);
  loginModel.$inject = ['buildModel'];
  function loginModel(buildModel) {
    return {
      'login': buildModel('login'),
      'sendcode': buildModel('sendcode')
    }
  }
});