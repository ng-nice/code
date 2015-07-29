'use strict';

angular.module('app').controller('LayoutHeaderController', function LayoutHeaderController() {
  var vm = this;
});

angular.module('app').directive('layoutHeader', function LayoutHeader() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/header.html',
    controller: 'LayoutHeaderController as vm'
  };
});
