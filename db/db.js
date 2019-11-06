/**
 * 数据库操作的总接口模块
 */
var dao_user = require('./dao_user');

module.exports = {
  // 查询用户
  getUser: function (phone, cb) {
    dao_user.getUser(phone, function (err, user) {
      if (err) {
        throw err;
      } else {
        cb(user);
      }
    })
  },
  // 新增用户
  addUser: function (phone, cb) {
    dao_user.addUser(phone, function (err, user) {
      if (err) {
        throw err;
      } else {
        cb(user);
      }
    })
  }
}
