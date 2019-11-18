/**
 * 操作addresses集合的dao模块
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
var addressSchema = new mongoose.Schema({
  "address": String, // 地址
  "contactor": String, //联系人
  "lat": String, // 纬度
  "lng": String, // 经度
  "phone": String, // 手机号
  "sex": Number, // 性别
  "state": Number, // 状态
  "userId": String, // 用户id
  "cityId": String, // 城市id
  "doorplate": String // 门牌号
});

//model
var AddressModel = mongoose.model('address', addressSchema);

// CRUD
/**
 * 查询指定用户id的地址列表
 * @param {用户id} userId
 * @param {*} cb 
 */
function getAddrsByUserId(userId, cb) {
  AddressModel.find({ userId: userId }, cb)
}

/**
 * 查询指定地址ID的地址信息
 * @param {用户id} addrId
 * @param {*} cb 
 */
function getAddrByAddrId(addrId, cb) {
  AddressModel.findOne({ _id: addrId }, cb)
}

/**
 * 添加地址
 * @param {*} addr 
 * @param {*} cb 
 */
function addAddr(addr, cb) {
  new AddressModel(addr).save(cb);
}

/**
 * 修改地址
 * @param {*} addr 
 * @param {*} cb 
 */
function updateAddr(addr, cb) {
  AddressModel.update({ _id: addr._id }, addr, cb)
}

/**
 * 删除地址
 * @param {*} addrId 
 * @param {*} cb 
 */
function deleteAddrById(addrId, cb) {
  AddressModel.remove({ _id: addrId }, cb)
}

/**
 * 获取默认地址
 * @param {*} userId 
 * @param {*} callback 
 */
function getDefaultByUserId(userId, callback) {
  AddressModel.findOne({ userId: userId }, callback);
}



module.exports = {
  getAddrsByUserId: getAddrsByUserId,
  getAddrByAddrId: getAddrByAddrId,
  addAddr: addAddr,
  updateAddr: updateAddr,
  deleteAddrById: deleteAddrById,
  getDefaultByUserId: getDefaultByUserId
}

// getAddrsByUserId('5dc3b63c441f2d236c5442c7', cb);

// addAddr({
//   "address": "波罗蜜",
//   "contactor": "东东",
//   "lat": "39.993851111808",
//   "lng": "116.31838249961 ",
//   "phone": "16600000001",
//   "sex": 0,
//   "state": 0,
//   "userId": "5dc3b63c441f2d236c5442c7",
//   "cityId": "113",
//   "doorplate": "9楼"
// }, cb)

// updateAddr({
// "_id":'5dc3d70acf6cc340932acc95',
//   "address": "波罗蜜",
//   "contactor": "咚咚锵",
//   "lat": "39.993851111808",
//   "lng": "116.31838249961 ",
//   "phone": "16600000001",
//   "sex": 0,
//   "state": 0,
//   "userId": "5dc3b63c441f2d236c5442c7",
//   "cityId": "113",
//   "doorplate": "9楼"
// }, cb);

// deleteAddrById('5dc3d70acf6cc340932acc95', cb);

// getDefaultByUserId('5dcd10e4c27712589c3dc664', cb);