define([
  'app'
], function (app) {
  'use strict';
  app.factory('buildModel', buildModel);
  buildModel.$inject = ['$resource', 'URL'];
  function buildModel($resource, URL) {
    return function (key, params, method) {
      var defaultMethod = {
        'get': { method: 'GET' },
        'post': {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        },
        'put': { method: 'PUT' },
        'del': { method: 'delete' }
      }
      if (!URL[key]) {
        console.error('?url.server??????: [' + key + ']?url');
      }
      return $resource(URL[key], params, angular.extend(defaultMethod, method));
    }
  }
})