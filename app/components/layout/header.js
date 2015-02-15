'use strict';

angular.module('app').controller('LayoutHeaderCtrl', function LayoutHeaderCtrl() {
  var vm = this;
});

angular.module('app').directive('layoutHeader', function LayoutHeader() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/header.html',
    controller: 'LayoutHeaderCtrl as vm'
  };
});
