/**
 * 浏览器端数据存储的工具模块
 * key
 * session
 * local
 * cookie
 */
define(function () {
  return {
    KEYS: {
      USER: "_dingcan_user_",
      INPUT_ADDR: "_dingcan_input_addr_",
      MAP_ADDR: "_dingcan_map_addr_",
      CART: "_dingcan_cart_",
      CURRENT_ADDR:'_dingcan_current_addr_',
      LOC_ADDR:'_dingcan_loc_addr_',
      ORDER_ADDR:'_dingcan_order_addr_',
    },
    session: {
      setItem: function (key, value) {
        // 如果存储的是对象 则转为json
        if (value instanceof Object) {
          value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
      },
      getItem: function (key) {
        var value = sessionStorage.getItem(key);
        if (value != null && (value.indexOf('{') === 0 || value.indexOf('[') === 0)) {
          value = JSON.parse(value);
        }
        return value;
      },
      removeItem: function (key) {
        sessionStorage.removeItem(key);
      }
    },
    local: {
      setItem: function (key, value) {
        // 如果存储的是对象 则转为json
        if (value instanceof Object) {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
      },
      getItem: function (key) {
        var value = localStorage.getItem(key);
        if (value != null && (value.indexOf('{') === 0 || value.indexOf('[') === 0)) {
          value = JSON.parse(value);
        }
        return value;
      },
      removeItem: function (key) {
        localStorage.removeItem(key);
      }
    }
  }
})