'use strict';

angular.module('com.ngnice.app').directive('bfCaptcha', function bfCaptcha() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var changeSrc = function() {
        element.attr('src', '/api/captcha.jpg?random=' + new Date().getTime());
      };
      changeSrc();
      element.on('click', function() {
        changeSrc();
      });
    }
  };
});
