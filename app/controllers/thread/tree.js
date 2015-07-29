'use strict';

angular.module('app').controller('ThreadTreeController', function ThreadTreeController(tree) {
  var vm = this;
  vm.items = [
    {
      id: 1,
      title: '这是第一个主题',
      poster: '雪狼',
      dateCreated: '2015-02-19T00:00:00',
      items: [
        {
          id: 11,
          title: '这是第一个回复',
          poster: '雪狼',
          dateCreated: '2015-02-19T00:00:01',
          items: [
            {
              id: 111,
              title: '回复1.1',
              poster: '破狼',
              dateCreated: '2015-02-19T00:01:00'
            },
            {
              id: 112,
              title: '回复1.2',
              poster: '破狼',
              dateCreated: '2015-02-19T00:01:30'
            }
          ]
        },
        {
          id: 12,
          title: '这是第二个回复',
          poster: '雪狼',
          dateCreated: '2015-02-19T00:00:03'
        }
      ]
    },
    {
      id: 2,
      title: '这是第二个主题，含有字母abcd和数字1234',
      poster: '破狼',
      dateCreated: '2015-02-19T15:00:00'
    }
  ];
  tree.enhance(vm.items);
  vm.test = function() {
    vm.items.push({
      id: 3,
      title: '3',
      poster: '雪狼',
      dateCreated: '2015-02-19T00:00:03',
      items: [
        {
          id: 31,
          title: '31',
          poster: '雪狼',
          dateCreated: '2015-02-19T00:00:03'
        },
        {
          id: 32,
          title: '32',
          poster: '雪狼',
          dateCreated: '2015-02-19T00:00:03'
        }
      ]
    });
    vm.items[0].items.push({
      id: 13,
      title: '13',
      poster: '雪狼',
      dateCreated: '2015-02-19T00:00:03'
    });
    tree.enhance(vm.items);
  };
});
