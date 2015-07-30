'use strict';
angular.module('com.ngnice.app').factory('AuthHandler', function AuthHandlerFactory($q, $injector) {
  return {
    responseError: function (rejection) {
      var ui = $injector.get('ui');
      // 如果服务器返回了401 unauthorized，那么就表示需要登录
      if (rejection.status === 401) {
        return ui.promptPassword('请输入密码：').then(function (password) {
          var Login = $injector.get('Login');
          var $http = $injector.get('$http');
          return Login.save({
            username: 'xuelang',
            password: password
          }).$promise.then(function () {
              return $http(rejection.config);
            });
        }, function () {
          return $q.reject(rejection);
        });
      } else {
        // 其它错误不用管，留给其它interceptor去处理
        return $q.reject(rejection);
      }
    }
  };
});
