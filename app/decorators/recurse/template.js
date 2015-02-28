'use strict';

angular.module('app').directive('bfTemplate', function bfTemplate() {
  return {
    restrict: 'A',
    priority: 2000,
    compile: function (element) {
      var template = element[0].outerHTML;
      return function (scope, element, attrs) {
        scope.$template = template;
        if (!scope.$dataSource) {
          scope.$dataSource = scope.$eval(attrs.bfTemplate);
        }
      };
    }
  };
});
