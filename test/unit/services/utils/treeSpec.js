describe("tree service >", function () {
  beforeEach(module('app'));
  var tree;
  // 这里可以注入服务或控制器，注入器会忽略名称两端的下划线
  beforeEach(inject(function (_tree_) {
    tree = _tree_;
  }));
  var treeData;
  var getFlattenData = function (items) {
    var result = items || [];
    angular.forEach(items, function (item) {
      result = result.concat(getFlattenData(item.items));
    });
    return result;
  };
  var findById = function (id) {
    return _.findWhere(getFlattenData(treeData), {id: id});
  };
  beforeEach(function () {
    treeData = [
      {
        id: 1,
        items: [
          {
            id: 11,
            items: [
              {
                id: 111
              },
              {
                id: 112
              }
            ]
          },
          {
            id: 12
          }
        ]
      }
    ];
    tree.enhance(treeData);
  });

  it('选中父节点时，自动选中直接子节点', function () {
    // 动作：选中中间节点
    findById(11).$check();
    expect(findById(111).$isChecked()).toBeTruthy();
    expect(findById(112).$isChecked()).toBeTruthy();
  });
  it('选中祖先节点时，自动选中间接子节点', function() {
    // 动作：选中根节点
    findById(1).$check();
    // 期待：子节点被选中
    expect(findById(11).$isChecked()).toBeTruthy();
    expect(findById(12).$isChecked()).toBeTruthy();
    // 期待：孙子节点被选中
    expect(findById(111).$isChecked()).toBeTruthy();
    expect(findById(112).$isChecked()).toBeTruthy();
  });
});
