'use strict';

angular.module('app').directive('bfFieldError', function bfFieldError($compile) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      var subScope = scope.$new(true);
      subScope.hasError = function() {
        return ngModel.$invalid && ngModel.$dirty;
      };
      subScope.errors = function() {
        return ngModel.$error;
      };
      var hint = $compile('<ul class="bf-field-error" ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name|error}}</li></ul>')(subScope);
      element.after(hint);
    }
  };
});
