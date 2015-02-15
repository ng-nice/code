// 设置初始数据
var items = [
  {
    id: 'u1',
    username: 'zhangsan',
    nickname: '张三',
    contacts: [
      {
        id: 'c1',
        mobile: '13333333333',
        region: 'bj'
      },
      {
        id: 'c2',
        mobile: '13333333334',
        region: 'sh'
      }
    ]
  },
  {
    id: 'u2',
    username: 'lisi',
    nickname: '李四13'
  }
];

for (var i = 3; i <= 1000; ++i) {
  items.push({
    id: 'u' + i,
    username: 'user_' + i,
    nickname: '用户' + i,
    contacts: [
      {
        id: 'c' + i + '-1',
        mobile: '1333333333' + i,
        region: 'bj'
      },
      {
        id: 'c' + i + '-2',
        mobile: '1333333333' + i,
        region: 'sh'
      }
    ]
  });
}
module.exports = items;
