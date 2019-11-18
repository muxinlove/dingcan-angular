/**
 * 配置处理用户相关请求的路由模块
 */

var db = require('../db/db.js');

module.exports = function (router) {

  /**
   * 首页轮播图数据
   */
  router.get('/index/banners', function (req, res, next) {
    db.getBanners(function (data) {
      res.send({
        "code": 0,
        data: data
      })
    })
  }),

    /**
    * 首页菜品数据
    */
    router.get('/index/data', function (req, res, next) {
      db.getMeals(function (meals) {
        res.send({
          "code": 0,
          "data": {
            "meals": meals,
            "isMatched": "yes",
            "restaurant": {
              "_id": 'xxxx',
              "address": "上海市杨浦区通北路高和云峰",
              "cityId": 0,
              "id": 1772,
              "lat": 39.993403,
              "lng": 116.311644,
              "minMoney": 0,
              "phone": "16600000001",
              "rstName": "波罗蜜店",
              "songcanfei": 5,
              "state": 1,
              "workTime": "08:00-19:00"
            }
          }
        })
      })
    })

}