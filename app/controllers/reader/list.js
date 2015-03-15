'use strict';

angular.module('app').controller('ReaderListCtrl', function ReaderListCtrl(Reader) {
  var vm = this;
  Reader.query(function(readers) {
    vm.items = readers;
  });
});
