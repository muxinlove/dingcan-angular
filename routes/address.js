/**
 * 配置处理地址相关请求的路由模块
 */

var db = require('../db/db.js');

module.exports = function (router) {

  /**
   * 获取地址列表
   */
  router.get('/getAddrsByUserId', function (req, res, next) {
    var userId = req.query.userId;
    db.getAddrsByUserId(userId, function (addrs) {
      res.send({
        code: 0,
        data: addrs
      })
    })
  })

  /**
   * 获取地址信息
   */
  router.get('/getAddrByAddrId', function (req, res, next) {
    var addrId = req.query.addrId;
    db.getAddrByAddrId(addrId, function (addr) {
      res.send({
        code: 0,
        data: addr
      })
    })
  })

  /**
   * 新增地址
   */
  router.post('/insertAddr', function (req, res, next) {
    var addr = req.body;
    db.addAddr(addr, function (addr) {
      res.send({
        code: 0,
        data: addr
      })
    })
  })

  /**
   * 修改地址
   */
  router.put('/updateAddr', function (req, res, next) {
    var addr = req.body;
    db.updateAddr(addr, function (addr) {
      res.send({
        code: 0,
        data: addr
      })
    })
  })

  /**
   * 删除地址
   */
  router.delete('/deleteAddrById', function (req, res, next) {
    var addrId = req.query.addrId;
    db.deleteAddrById(addrId, function (result) {
      res.send({
        code: 0,
        data: result
      })
    })
  })
}