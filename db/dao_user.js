/**
 * 操作users集合的dao模块
 */
var connection = require('./connection.js');
var mongoose = connection.mongoose;

//test #start
// connection.connect();
// function cb(error, user) {
//     if(error){
//         throw error;
//     }else{
//         console.log(user);
//     }
// }
//test #end

// 创建模式
var userSchema = new mongoose.Schema({
  "phone": String
});

//model
var UserModel = mongoose.model('user', userSchema);

// CRUD
// 查询用户
function getUser(phone, cb) {
  UserModel.findOne({ phone: phone }, cb)
}
// 新增用户
function addUser(phone, cb) {
  var userModel = new UserModel({ phone: phone });
  userModel.save(cb);
}

module.exports = {
  getUser: getUser,
  addUser: addUser
}

// getUser('13716962779', cb)
// addUser('13716962779', cb)