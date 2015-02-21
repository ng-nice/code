'use strict';

angular.module('app').filter('error', function (Errors) {
  return function (name) {
    return Errors[name] || name;
  };
});
