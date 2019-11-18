/**
 * 配置处理订单相关请求的路由模块
 */

var db = require('../db/db.js');
//时间格式化的库
var moment = require('moment');

module.exports = function (router) {

  /**
   * 获取默认地址
   */
  router.get('/order/getDefaultAddress', function (req, res, next) {
    var userId = req.query.userId;
    db.getDefaultByUserId(userId, function (addr) {
      res.send({
        code: 0,
        data: addr
      })
    })
  })

  /**
  * 下单
  */
  router.post('/order/createOrder', function (req, res, next) {
    var order = req.body;
    order.state = 1;
    db.addOrder(order, function (order) {
      res.send({
        code: 0,
        data: order
      })
    })
  })

  /**
  * 获取订单详情
  */
  router.get('/order/detail', function (req, res, next) {
    var id = req.query.id;
    db.getOrderById(id, function (order) {
      var stateText;
      switch (order.state) {
        case 0:
          stateText = '待支付';
          break;
        case 1:
          stateText = '已付款';
          break;
        case 3:
          stateText = '已完成';
          break;
        case 4:
          stateText = '店铺拒单';
          break;
        case 5:
          stateText = ' 商家已接单';
          break;
        case 6:
          stateText = '已退单';
          break;
        case 7:
          stateText = '未支付的取消订单';
          break;
        case 8:
          stateText = '订单异常';
          break;
        case 9:
          stateText = '退单中';
          break;
        case 10:
          stateText = '商家拒绝退单';
      }
      //给对象设置属性   需要写上 _doc
      order._doc.stateText = stateText;
      order._doc.arrive_time = moment(order.arrive_time).format('HH:mm')
      
      res.send({
        code: 0,
        data: order
      })
    })
  })

}