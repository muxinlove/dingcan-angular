/**
 * 浏览器端数据存储的工具模块
 * key
 * session
 * local
 * cookie
 */
define(function () {
  return {
    KEY: {
      USER: "_dingcan_user_"
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