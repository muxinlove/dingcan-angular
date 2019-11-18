define([
  'app'
], function (app) {
  'use strict';
  app.factory('buildPromise', buildPromise);
  buildPromise.$inject = ['$q'];

  function buildPromise($q) {

    return function (resource, data, key) {
      if (!resource) {
        console.error('找不到指定的resource对象');
        return false;
      }
      var defered = $q.defer();
      var params = angular.extend({}, data);
      key = key || 'get';
      resource[key](params, function (d) {
        defered.resolve(d);
      }, function (d) {
        defered.reject(d);
      });
      return defered.promise;
    }
  }
})

