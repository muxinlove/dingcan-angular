define([
  'app',
], function (app) {
  'use strict';
  app.factory('tools', tools);
  tools.$inject = ['toastr', 'URL'];
  function tools(toastr, URL) {
    return {
      toastr: toastr,
      URL: URL
    };
  }
});