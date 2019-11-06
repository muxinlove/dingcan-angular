/**
 * 数据库操作的工具类
 * 连接数据库
 * 断开数据库
 */
var mongoose = require('mongoose');
exports.mongoose = mongoose;

function connect() {
  //连接
  mongoose.connect('mongodb://127.0.0.1/dingcan', { useNewUrlParser: true, useUnifiedTopology: true })
  // 获取连接
  var connection = mongoose.connection;
  // 绑定连接错误监听
  connection.on('error', console.error.bind(console, 'connection error:'))
  //绑定连接成功监听
  connection.once('open', function (callback) {
    console.log('WE ARE CONNECTED!');
  });
}

// 暴露连接数据库
exports.connect = connect;

/*断开连接服务器*/
var disconnect = function () {
  mongoose.disconnect();
}

exports.disconnect = disconnect;
