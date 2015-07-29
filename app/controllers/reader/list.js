'use strict';

angular.module('app').controller('ReaderListController', function ReaderListController(Reader) {
  var vm = this;
  Reader.query(function(readers) {
    vm.items = readers;
  });
});
