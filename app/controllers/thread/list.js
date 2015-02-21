'use strict';

angular.module('app').controller('ThreadListCtrl', function ThreadListCtrl() {
  var vm = this;
  vm.items = [
    {
      title: '这是第一个主题',
      poster: '雪狼',
      dateCreated: '2015-02-19T00:00:00'
    },
    {
      title: '这是第二个主题，含有字母abcd和数字1234',
      poster: '破狼',
      dateCreated: '2015-02-19T15:00:00'
    }
  ];
  for (var i = 0; i < 10; ++i) {
    vm.items.push({
      title: '主题' + i,
      poster: 'user' + i,
      dateCreated: '2015-02-18T15:00:00'
    });
  }
});
