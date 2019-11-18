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
var bannerSchema = new mongoose.Schema({
  "img_src": String,
  "link": String,
  "sort": Boolean
});

//model
var BannerModel = mongoose.model('index_banner', bannerSchema);

// CRUD
// 获取轮播图数据
function getBanners(cb) {
  BannerModel.find(cb);
}

module.exports = {
  getBanners: getBanners
}
