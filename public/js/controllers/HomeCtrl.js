define([
  'app',
  'storageUtil'
], function (app, storageUtil) {
  'use strict';
  app.controller('HomeCtrl', ['$scope', '$rootScope', 'banners', 'data', '$timeout', 'mapService', '$state', function ($scope, $rootScope, banners, data, $timeout, mapService, $state) {
    $scope.banners = banners.data;
    $scope.meals = data.data.meals;

    // 轮播图
    // 延迟等待repeat渲染 否则不能滑动
    $timeout(function () {
      new Swiper('#bannerSwiper', {//配置对象
        pagination: '.swiper-pagination', //指定提示圆点显示的容器选择器
        paginationClickable: true, //提示圆点是否可点击
        autoplay: 3000, //自动播放的间隔时间
        autoplayDisableOnInteraction: false, //手动操作后从新自动播放
        loop: true, //循环翻页
        effect: 'cube',//翻页: 立体效果
        cube: {
          shadow: true //下部有投影
        }
      })
    }, 100)

    // 定位
    //初始化当前定位地址
    var currentAddr = storageUtil.session.getItem(storageUtil.KEYS.CURRENT_ADDR);
    storageUtil.session.removeItem(storageUtil.KEYS.LOC_ADDR);
    if (currentAddr) {
      $scope.address = currentAddr;
    } else {
      $scope.address = {
        name: '正在定位中'
      };
      // 初始化地图
      mapService.loadMapAPI('homeDiv', 'initMap');

      // 防止进入首页 没有拿到定位数据 初始化的位置
      var initAddr = {
        name: '高和云峰',
        lat: '31.2640700000',
        lng: '121.5154700000'
      }
      storageUtil.session.setItem(storageUtil.KEYS.CURRENT_ADDR, initAddr);

      window.initMap = function () {
        mapService.getCurrentAddr()
          .then(function (address) {
            $scope.address = address;
            //保存地址到session中
            storageUtil.session.setItem(storageUtil.KEYS.CURRENT_ADDR, $scope.address);
          })
      }
    }

    //初始化购物车
    initCart();

    // 同步购物车和菜品列表
    updateMeals();

    //保存songcanfei
    $scope.cart.songcanfei = data.data.restaurant.songcanfei;
    // 保存商家id
    $scope.cart.rstId = data.data.restaurant._id;

    // 购物车显示/隐藏
    $scope.isOpen = false;
    var isChecked = false;
    $scope.event = {
      showCart: function () {
        $scope.isOpen = !$scope.isOpen;
      },
      /**
       * 加减购物车
       */
      updateMealCount(isAdd, meal, event) {
        //  一次加减之后才能再次点击
        if (!isChecked) {
          isChecked = true;
          // 购物车动画效果：
          // 克隆出一个发生事件的<a>,指定内容1，指定样式，添加到body中
          var $a = angular.element(event.target);
          var $flyA = angular.copy($a).html('1').addClass('jia-fly');
          var $body = angular.element(document.body);
          $body.append($flyA);

          // 计算出当前的起始位置（根据a）, startLeft, startTop, 并设置上
          var startLeft = $a[0].getBoundingClientRect().left;
          var startTop = $a[0].getBoundingClientRect().top;
          $flyA.css({
            left: startLeft + 'px',
            top: startTop + 'px'
          })

          // 计算目标位置的坐标（id为total_count的div）：endLeft endTop
          var totleCountDiv = document.getElementById('total_count');
          var endLeft = totleCountDiv.getBoundingClientRect().left;
          var endTop = totleCountDiv.getBoundingClientRect().top;

          // 移动动画：
          //     持续多长时间：totleTime = 500
          var totleTime = 500;
          //     小移动的间隔时间：intervalTime = 20
          var intervalTime = 20;
          //     计算出移动的次数：moveCount = totleTime/intervalTime
          var moveCount = totleTime / intervalTime;
          //     计算出每次小移动的距离：
          var moveX = (endLeft - startLeft) / moveCount
          var moveY = (endTop - startTop) / moveCount
          // 启动循环定时器：
          var intervalId = setInterval(function () {
            //     更新startLeft, startTop
            startLeft += moveX;
            startTop += moveY;
            //     设置给<a>
            //     判断是否到达指定位置了，到达指定位置，停止定时器
            if (startLeft <= endLeft) {
              startLeft = endLeft;
              startTop = endTop;
              clearInterval(intervalId);
            }
            $flyA.css({
              left: startLeft + 'px',
              top: startTop + 'px'
            })

          }, intervalTime);

          $timeout(function () {
            // 移除a
            $flyA.remove();

            if (isAdd) {
              if (meal.count) {
                meal.count++
              } else {
                meal.count = 1;
                //当个数为1的时候就需要加到购物车去
                $scope.cart.meals.push(meal);
              }

              $scope.cart.totalPrice += meal.price;
              $scope.cart.totalCount += 1;
            } else {
              meal.count--;
              //当个数为0的时候，从购物车移除该菜品
              if (meal.count == 0) {
                //找到下标
                var index = $scope.cart.meals.findIndex(function (item, index) {
                  return item.count == 0;
                })
                //移除
                $scope.cart.meals.splice(index, 1);
              }

              $scope.cart.totalPrice -= meal.price;
              $scope.cart.totalCount -= 1;
            }
            // 保存到session中
            storageUtil.session.setItem(storageUtil.KEYS.CART, $scope.cart);
            isChecked = false;
          }, totleTime + 20);
        }
      },
      // 下单
      toOrderConfirmUI() {
        if ($scope.cart.totalCount > 0) {
          $state.go('app.order_confirm');
        }
      }
    }

    function initCart() {
      var cart = storageUtil.session.getItem(storageUtil.KEYS.CART);
      if (!cart) {
        cart = {
          meals: [], // 菜品
          songcanfei: 0, // 送餐费
          totalPrice: 0, // 总价
          totalCount: 0, // 总数
          rstId: null // 商家id
        }
      }
      $scope.cart = cart;
    }


    function updateMeals() {
      if ($scope.cart.meals.length) {
        var cMeals = angular.copy($scope.cart.meals);
        var cartMeals = [];
        cMeals.forEach(function (cMeal) {
          var index = $scope.meals.findIndex(function (dMeal) {
            return dMeal._id == cMeal._id;
          });
          if (index > 0) {
            //将购物车中meal的count值给data的meal
            $scope.meals[index].count = cMeal.count;
            //同步最新的meal
            cartMeals.push($scope.meals[index]);
          }
        })
        // 將菜单中没有的菜品去除
        $scope.cart.meals = cartMeals;
        storageUtil.session.setItem(storageUtil.KEYS.CART, $scope.cart);
      }
    }

  }])
});