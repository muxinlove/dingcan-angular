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
var mealSchema = new mongoose.Schema({
  "group_id": String,
  "groupName": String,
  "mealCode": String,
  "mealType": Number,
  "mealName": String,
  "price": Number,
  "originalPrice": Number,
  "picture": String,
  "instruction": String,
  "sales": Number,
  "state": Number
});

//model
var MealModel = mongoose.model('meal', mealSchema);

// CRUD
// 获取菜品数据
function getMeals(cb) {
  MealModel.find(cb);
}

module.exports = {
  getMeals: getMeals
}
