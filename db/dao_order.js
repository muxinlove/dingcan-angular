/**
 * 操作orders集合的dao模块
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
var orderSchema = new mongoose.Schema({
  "contactor": String,
  "address": String,
  "phone": String,
  "remark": String,
  "doorplate": String,
  "total_money": Number,
  "peisongfei": Number,
  "state": Number,
  "arrive_time": Date,
  "detail": String,
  "user_id": String
});

//model
var OrderModel = mongoose.model('order', orderSchema);

// CRUD
// 下单
function addOrder(order, cb) {
  new OrderModel(order).save(cb);
}

// 获取订单详情
function getOrderById(id, callback) {
  OrderModel.findOne({ _id: id }, callback);
}

module.exports = {
  addOrder: addOrder,
  getOrderById: getOrderById
}

// addOrder({
//   address: "华侨城苏河湾东区-88号院",
//   arrive_time: "2019-11-09 19:01",
//   contactor: "东东",
//   detail: JSON.stringify({ "data": { "rstId": "xxxx", "money": 122, "meals": [{ "_id": "575f7085f8a14116283dab9e", "group_id": "0", "groupName": "", "mealCode": "", "mealType": 1, "mealName": "熏鸡肉沙拉", "price": 23, "originalPrice": 28, "picture": "img / 1.png", "instruction": null, "sales": 256, "state": null, "$$hashKey": "object: 248", "count": 1 }, { "_id": "575f7085f8a14116283daba2", "group_id": "1", "groupName": null, "mealCode": null, "mealType": 1, "mealName": "牛油果三文鱼沙拉", "price": 33, "originalPrice": 36, "picture": "img / 5.png", "instruction": null, "sales": 266, "state": null, "$$hashKey": "object: 249", "count": 1 }, { "_id": "575f7085f8a14116283daba3", "group_id": "1", "groupName": null, "mealCode": null, "mealType": 1, "mealName": "黑椒牛肉沙拉", "price": 38, "originalPrice": 40, "picture": "img / 6.png", "instruction": null, "sales": 452, "state": null, "$$hashKey": "object: 250", "count": 1 }, { "_id": "575f7085f8a14116283daba0", "group_id": "2", "groupName": "", "mealCode": null, "mealType": 1, "mealName": "藜麦牛油果沙拉", "price": 23, "originalPrice": 25, "picture": "img / 3.png", "instruction": null, "sales": 366, "state": null, "$$hashKey": "object: 251", "count": 1 }] } }),
//   doorplate: "901",
//   peisongfei: 5,
//   phone: "16600000001",
//   remark: "我要米饭",
//   total_money: 117,
//   user_id: "5dcd10e4c27712589c3dc664",
// }, cb);