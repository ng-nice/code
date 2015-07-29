'use strict';

angular.module('app').controller('AppLayoutController', function AppLayoutController() {
  var vm = this;
});
angular.module('app').directive('appLayout', function appLayout() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/_layout.html',
    controller: 'AppLayoutController as vm'
  };
});
