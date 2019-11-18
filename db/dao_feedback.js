/**
 * 操作feedback集合的dao模块
 */
var connection = require('./connection.js');
var mongoose = connection.mongoose;

//test #start
// connection.connect();
// function cb(error, user) {
//   if (error) {
//     throw error;
//   } else {
//     console.log(user);
//   }
// }
//test #end

// 创建模式
var fbSchema = new mongoose.Schema({
  "user_id": String,
  "phone": String,
  "content": String,
  "create_time": Date
});

//model
var FbModel = mongoose.model('feedback', fbSchema);

// CRUD
// 新增意见反馈
function addFeedback(feedback, cb) {
  feedback.create_time = Date.now();
  new FbModel(feedback).save(cb);
}

module.exports = {
  addFeedback: addFeedback
}

// addFeedback({
//   user_id: '5dc3b63c441f2d236c5442c7',
//   phone: '16600000001',
//   content: '这是个很不错的软件哦'
// }, cb)