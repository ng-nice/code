'use strict';
angular.module('app').provider('AuthHandler', function AuthHandlerProvider() {
  var prefix = 'app';
  this.setEventPrefix = function(value) {
    prefix = value;
  };
  var eventNameOf = function(action) {
    return [prefix, 'auth', action].join('.');
  };
  this.$get = function ($q, $injector, $rootScope) {
    var AuthHandler = {};
    AuthHandler.request = function (config) {
      if (config.data && config.data.$skipAuthHandler) {
        config.$skipAuthHandler = true;
        delete config.data.$skipAuthHandler;
      }
      if (config.params && config.params.$skipAuthHandler) {
        config.$skipAuthHandler = true;
        delete config.params.$skipAuthHandler;
      }
      return $q.when(config);
    };
    // 用数组，以便保持原有顺序
    var requests = [];
    var modal = null;
    AuthHandler.responseError = function (rejection) {
      // 如果需要认证，则弹出认证对话框，用户填写完毕后发出认证请求，请求通过后则重发最后一次的请求包
      function reset() {
        modal = null;
        requests.splice(0, requests.length);
      }

      var event = $rootScope.$broadcast(eventNameOf('check'));
      if (!event.isDefaultPrevented() && rejection.status === 401 && rejection.config && !rejection.config.$skipAuthHandler && !auth.before) {
        // 如果已经弹出了对话框，则不再弹出，而是把当前的request追加到列表
        var deferred = $q.defer();
        requests.push({deferred: deferred, config: rejection.config});
        var auth = $injector.get(authName);
        if (rejection.data.length > 0) {
          var ui = $injector.get('ui');
          ui.error(rejection.data).then(function () {
            location.reload();
          });
        }
        else if (!modal) {
          modal = auth.showLogin();
          modal.then(
            function () {
              var $http = $injector.get('$http');
              // 登录成功则按顺序逐个发送刚才失败的请求
              function sendNext(request) {
                return $http(request.config).then(
                  function (resp) {
                    request.deferred.resolve(resp);
                  },
                  function (newRejection) {
                    request.deferred.reject(newRejection);
                  }
                );
              }

              var result = $q.when(0);
              _.each(requests, function (request) {
                // 不管上一个的成败，都要发下一个，因为两个有顺序依赖的请求不会同时出现在这个队列中
                result = result.then(
                  function () {
                    return sendNext(request);
                  },
                  function () {
                    return sendNext(request);
                  }
                );
              });
              reset();
            },
            // 用户取消了登录，直接让每个都失败就行了
            function () {
              _.each(requests, function (request) {
                request.deferred.reject(rejection);
              });
              reset();
            }
          );
        }
        return deferred.promise;
      } else {
        return $q.reject(rejection);
      }
    };
    return AuthHandler;
  };
});
