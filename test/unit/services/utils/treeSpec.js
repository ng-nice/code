describe("service > tree >", function () {
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
  it('选中所有子节点时，自动选中父节点', function () {
    findById(111).$check();
    findById(112).$check();
    expect(findById(11).$isChecked()).toBeTruthy();
    findById(12).$check();
    expect(findById(1).$isChecked()).toBeTruthy();
  });
  it('取消选中所有子节点时，自动取消选中父节点', function () {
    // 先全都选中
    findById(1).$check();
    expect(findById(112).$isChecked()).toBeTruthy();
    // 逐个反选
    findById(111).$unCheck();
    findById(112).$unCheck();
    expect(findById(11).$isChecked()).toBeFalsy();
    findById(12).$unCheck();
    expect(findById(1).$isChecked()).toBeFalsy();
  });
  it('部分选中子节点时，父节点显示为“待定”状态', function () {
    findById(111).$check();
    expect(findById(11).$isIndeterminate()).toBeTruthy();
    expect(findById(1).$isIndeterminate()).toBeTruthy();
    // 子节点本身和没有子节点的节点不受影响
    expect(findById(111).$isIndeterminate()).toBeFalsy();
    expect(findById(12).$isIndeterminate()).toBeFalsy();
  });
  it('全部选中子节点时，父节点为“非待定”状态', function() {
    findById(111).$check();
    expect(findById(11).$isIndeterminate()).toBeTruthy();
    findById(112).$check();
    expect(findById(11).$isIndeterminate()).toBeFalsy();
  });
  it('$checkToggle会切换当前节点的选中状态', function() {
    var node = findById(111);
    node.$checkToggle();
    expect(node.$isChecked()).toBeTruthy();
    node.$checkToggle();
    expect(node.$isChecked()).toBeFalsy();
  });
});
