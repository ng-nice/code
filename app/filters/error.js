'use strict';

angular.module('app').filter('error', function () {
  var messages = {
    email: '不是有效格式的邮件地址',
    required: '此项不能为空'
  };
  return function (name) {
    return messages[name] || name;
  };
});
