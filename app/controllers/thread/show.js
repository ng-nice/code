'use strict';

angular.module('app').controller('ThreadShowController', function ThreadShowController($stateParams) {
  var vm = this;
  vm.id = $stateParams.id;
  vm.title = $stateParams.title;
  vm.poster = $stateParams.poster;
});
