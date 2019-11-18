var express = require('express');
var router = express.Router();

// 引入分路由模块
var user = require('./user.js');
var address = require('./address.js');
var home = require('./home.js');
var order = require('./order.js');

user(router);
address(router);
home(router);
order(router);

module.exports = router;
