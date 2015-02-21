'use strict';

angular.module('app').directive('bfAssertSameAs', function bfAssertSameAs() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      var isSame = function (value) {
        var anotherValue = scope.$eval(attrs.bfAssertSameAs);
        return value === anotherValue;
      };
      ngModel.$parsers.push(function (value) {
        ngModel.$setValidity('same', isSame(value));
        return isSame(value) ? value : undefined;
      });
      scope.$watch(
        function () {
          return scope.$eval(attrs.bfAssertSameAs);
        },
        function () {
          ngModel.$setValidity('same', isSame(ngModel.$modelValue));
        }
      );
    }
  };
});
