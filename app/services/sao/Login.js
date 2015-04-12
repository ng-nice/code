'use strict';

angular.module('app').factory('Login', function LoginFactory($resource) {
  return $resource('/api/login/index');
});
