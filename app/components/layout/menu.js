'use strict';

angular.module('com.ngnice.app').controller('LayoutMenuController', function LayoutMenuController() {
  var vm = this;
});
angular.module('com.ngnice.app').directive('layoutMenu', function LayoutMenu() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/menu.html',
    controller: 'LayoutMenuController as vm'
  };
});
