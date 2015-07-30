'use strict';

angular.module('com.ngnice.app').factory('Login', function LoginFactory($resource) {
  return $resource('/api/login/index');
});
