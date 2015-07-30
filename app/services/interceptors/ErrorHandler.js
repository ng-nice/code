'use strict';

angular.module('com.ngnice.app').factory('ErrorHandler', function ErrorHandlerFactory($q, $injector) {
  var ErrorHandler = {};

  ErrorHandler.request = function (config) {
    if (config.data && config.data.$skipErrorHandler) {
      config.$skipErrorHandler = true;
      delete config.data.$skipErrorHandler;
    }
    if (config.params && config.params.$skipErrorHandler) {
      config.$skipErrorHandler = true;
      delete config.params.$skipErrorHandler;
    }
    return $q.when(config);
  };
  ErrorHandler.responseError = function (rejection) {
    // 这里不管401，留给authHandler去处理
    if (rejection.status === 401) {
      return $q.reject(rejection);
    }

    var ui = $injector.get('ui');
    if (rejection.config && !rejection.config.$skipErrorHandler) {
      // 弹出错误对话框
      switch (rejection.status) {
        case 0:
          // 不处理abort或跨域错误
          break;
        case 400:
          var data = rejection.data || {};
          if (angular.isString(data)) {
            data = angular.fromJson(data);
          }
          var message = data.message || data.code;
          ui.error(message);
          break;
        case 403:
          ui.error('您没有权限访问此功能：' + rejection.config.method + ' ' + rejection.config.url);
          break;
        case 404:
          ui.error('您请求的功能不存在：' + rejection.config.method + ' ' + rejection.config.url);
          break;
        case 406:
          // TODO: 进行统一的错误处理
          ui.error('内部错误：数据格式不正确！');
          break;
        case 500:
          ui.error('内部错误：' + rejection.status + ' - ' + rejection.data);
          break;
        default:
          ui.error('其他错误：' + rejection.status + ' - ' + rejection.data);
      }
    }
    return $q.reject(rejection);
  };
  return ErrorHandler;
});
