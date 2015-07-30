'use strict';

angular.module('com.ngnice.app').directive('bfCheckIndeterminate', function bfCheckIndeterminate() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(
        function () {
          return scope.$eval(attrs.bfCheckIndeterminate);
        },
        function (value) {
          angular.forEach(element, function (DOM) {
            DOM.indeterminate = value;
          });
        }
      );
    }
  };
});
