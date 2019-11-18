/**
 * 配置处理用户相关请求的路由模块
 */

var db = require('../db/db.js');

module.exports = function (router) {

  var users = {}; //保存所有的phone:code的对象

  /**
   * 请求验证码
   */
  router.get('/sendcode', function (req, res, next) {
    // 获取数据
    var phone = req.query.phone;
    // 生成随机6位码
    var code = randomCode(6);
    // 发给指定的手机
    console.log(`向${phone}发送验证码短信:${code}`);
    // 保存验证码
    users[phone] = code;
    //返回数据
    res.send({ "code": 0 })
  })

  /**
   * 登陆
   */
  router.post('/login', function (req, res, next) {
    // 获取数据
    var phone = req.body.phone;
    var code = req.body.code;
    // 比对验证码
    if (users[phone] != code) {
      res.send({ code: 1, msg: '验证码不正确' });
      return;
    }
    // 删除保存的验证码
    delete users[phone];

    // 查询用户 如果有 则返回用户数据 否则新增用户
    db.getUser(phone, function (user) {
      if (user) {
        res.send({
          code: 0,
          data: user
        })
      } else {
        db.addUser(phone, function (user) {
          res.send({
            code: 0,
            data: user
          })
        })
      }
    })
  })

  /**
   * 意见反馈
   */
  router.post('/feedback', function (req, res, next) {
    // 获取数据
    var params = req.body;

    // 新增
    db.addFeedback(params, function (feedback) {
      res.send({
        code: 0,
        data: feedback
      })
    })
  })

  function randomCode(length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var result = ""; //统一改名: alt + shift + R
    for (var i = 0; i < length; i++) {
      var index = Math.ceil(Math.random() * 9);
      result += chars[index];
    }
    return result;
  }
}