'use strict';

angular.module('app').controller('ThreadShowCtrl', function ThreadShowCtrl($stateParams) {
  var vm = this;
  vm.id = $stateParams.id;
  vm.title = $stateParams.title;
  vm.poster = $stateParams.poster;
});
