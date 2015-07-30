'use strict';

angular.module('com.ngnice.app').directive('bfRecurse', function bfRecurse($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var subScope = scope.$new(true);
      subScope.$dataSource = scope.$eval(attrs.bfRecurse);
      var dom = $compile(scope.$template)(subScope);
      element.replaceWith(dom);
    }
  };
});
