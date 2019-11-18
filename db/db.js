/**
 * 数据库操作的总接口模块
 */
var dao_user = require('./dao_user');
var dao_feedback = require('./dao_feedback');
var dao_address = require('./dao_address');
var dao_banner = require('./dao_banner');
var dao_meal = require('./dao_meal');
var dao_order = require('./dao_order');

module.exports = {
  /************************* 登 陆 **********************************/
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
  },
  /************************* 意见反馈 **********************************/
  // 新增意见反馈
  addFeedback: function (feedback, cb) {
    dao_feedback.addFeedback(feedback, function (err, feedback) {
      if (err) {
        throw err;
      } else {
        cb(feedback);
      }
    })
  },
  /************************* 地址相关 **********************************/
  // 获取地址列表
  getAddrsByUserId: function (userId, cb) {
    dao_address.getAddrsByUserId(userId, function (err, addrs) {
      if (err) {
        throw err;
      } else {
        cb(addrs);
      }
    })
  },
  getAddrByAddrId: function (addrId, cb) {
    dao_address.getAddrByAddrId(addrId, function (err, addr) {
      if (err) {
        throw err;
      } else {
        cb(addr);
      }
    })
  },
  // 新增地址
  addAddr: function (addr, cb) {
    dao_address.addAddr(addr, function (err, addr) {
      if (err) {
        throw err;
      } else {
        cb(addr);
      }
    })
  },
  // 修改地址
  updateAddr: function (addr, cb) {
    dao_address.updateAddr(addr, function (err, addr) {
      if (err) {
        throw err;
      } else {
        cb(addr);
      }
    })
  },
  // 删除地址
  deleteAddrById: function (addrId, cb) {
    dao_address.deleteAddrById(addrId, function (err, result) {
      if (err) {
        throw err;
      } else {
        cb(result);
      }
    })
  },
  /************************* 首 页 **********************************/
  // 获取轮播图数据
  getBanners: function (cb) {
    dao_banner.getBanners(function (err, banners) {
      if (err) {
        throw err;
      } else {
        cb(banners);
      }
    })
  },
  // 获取菜品数据
  getMeals: function (cb) {
    dao_meal.getMeals(function (err, meals) {
      if (err) {
        throw err;
      } else {
        cb(meals);
      }
    })
  },

  /************************* 订 单 **********************************/
  // 获取默认地址
  getDefaultByUserId: function (userId, cb) {
    dao_address.getDefaultByUserId(userId, function (err, addr) {
      if (err) {
        throw err;
      } else {
        cb(addr);
      }
    })
  },
  // 下单
  addOrder: function (order, cb) {
    dao_order.addOrder(order, function (err, order) {
      if (err) {
        throw err;
      } else {
        cb(order);
      }
    })
  },
  // 获取订单详情
  getOrderById: function (id, cb) {
    dao_order.getOrderById(id, function (err, order) {
      if (err) {
        throw err;
      } else {
        cb(order);
      }
    })
  }

}
