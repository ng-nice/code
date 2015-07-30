'use strict';

angular.module('com.ngnice.app').filter('error', function (Errors) {
  return function (name, customMessages) {
    var errors = angular.extend({}, Errors, customMessages);
    return errors[name] || name;
  };
});
