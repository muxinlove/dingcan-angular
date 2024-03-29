/**
 * sms 短信 验证码 相关工具
 * 
 * 容联 云通讯
 */

var md5 = require('blueimp-md5');
var moment = require('moment');
var Base64 = require('js-base64').Base64;
var request = require('request');

function randomCode(length) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var result = ""; //统一改名: alt + shift + R
  for (var i = 0; i < length; i++) {
    var index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }
  return result;
}

function sendCode(phone, code, callback) {
  var BASE_URL = 'https://app.cloopen.com:8883';
  var ACCOUND_SID = '8a216da8584bf8cf0158515247180536';
  var APP_ID = '8a216da8584bf8cf01585152487e053c';
  var AUTH_TOKEN = "c8fabfd43ca14d8abc4b8f63172042e5";

  // REST API 验证参数，生成规则如下
  // 1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
  // 时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
  // 2.SigParameter参数需要大写，如不能写成sig = abcdefg而应该写成sig = ABCDEFG
  var time = moment().format('YYYYMMDDHHmmss');
  var SigParameter = md5(ACCOUND_SID + AUTH_TOKEN + time);

  var url = BASE_URL + '/2013-12-26/Accounts/' + ACCOUND_SID + '/SMS/TemplateSMS?sig=' + SigParameter;

  // 2.请求体
  var body = {
    to: phone,
    appId: APP_ID,
    templateId: '1',
    datas: [code, '2']
  }

  // 3.请求头
  // 验证信息，生成规则详见下方说明
  // 1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
  // 2.冒号为英文冒号
  // 3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
  var Authorization = Base64.encode(ACCOUND_SID + ':' + time);
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length,
    'Authorization': Authorization
  }

  //4. 发送请求, 并得到返回的结果, 调用callback

  request({
    method: 'POST',
    url: url,
    headers: headers,
    body: body,
    json: true
  }, function (error, response, body) {
    console.log(body);
    callback(body.statusCode === '000000')
  });

}

module.exports = {
  randomCode: randomCode,
  sendCode: sendCode
}


// sendCode('16621182114', randomCode(6), function (success) {
//     console.log(success);
// })