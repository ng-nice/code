'use strict';

angular.module('app').controller('AppLayoutCtrl', function AppLayoutCtrl() {
  var vm = this;
});
angular.module('app').directive('appLayout', function appLayout() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/_layout.html',
    controller: 'AppLayoutCtrl as vm'
  };
});
