'use strict';

angular.module('com.ngnice.app').controller('LayoutHeaderController', function LayoutHeaderController() {
  var vm = this;
});

angular.module('com.ngnice.app').directive('layoutHeader', function LayoutHeader() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/header.html',
    controller: 'LayoutHeaderController as vm'
  };
});
