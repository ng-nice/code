'use strict';

angular.module('app').controller('LayoutMenuController', function LayoutMenuController() {
  var vm = this;
});
angular.module('app').directive('layoutMenu', function LayoutMenu() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/menu.html',
    controller: 'LayoutMenuController as vm'
  };
});
