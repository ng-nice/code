'use strict';

angular.module('app').controller('LayoutMenuCtrl', function LayoutMenuCtrl() {
  var vm = this;
});
angular.module('app').directive('layoutMenu', function LayoutMenu() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/menu.html',
    controller: 'LayoutMenuCtrl as vm'
  };
});
