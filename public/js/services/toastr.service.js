define([
	'app',
], function (app) {
	'use strict';
	app.factory("toastr", ['toaster', function (toaster) {
		setToastr();
		var service = {
			show: function (message, type, title) {
				type = type || 'success'; // success info warning error
				toaster[type] && toaster[type](message, title);
			},
			success: function (message, title, timeout) {
				setTimout(timeout);
				toaster.success(message, title);
			},
			info: function (message, title, timeout) {
				setTimout(timeout);
				toaster.info(message, title);
			},
			warning: function (message, title, timeout) {
				setTimout(timeout);
				toaster.warning(message, title);
			},
			error: function (message, title, timeout) {
				setTimout(timeout);
				toaster.error(message, title);
			}
		}
		return service;

		function setToastr(options) {
			var defaultOptions = {
				"close-button": true,
				"position-class": "toast-top-center",
				"time-out": 3000
			};
			toaster.options = defaultOptions;
		}
		function setTimout(timeout) {
			timeout = timeout || 3000;
			toaster.options['time-out'] = timeout;
		}
	}]);
});