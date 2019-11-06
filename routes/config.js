var express = require('express');
var router = express.Router();

// 引入分路由模块
var user = require('./user.js');

user(router);

module.exports = router;
