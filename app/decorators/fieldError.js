'use strict';

angular.module('com.ngnice.app').directive('bfFieldError', function bfFieldError($compile) {
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
      subScope.customMessages = scope.$eval(attrs.bfFieldError);
      var hint = $compile('<ul class="bf-field-error" ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name|error:customMessages}}</li></ul>')(subScope);
      element.after(hint);
    }
  };
});
