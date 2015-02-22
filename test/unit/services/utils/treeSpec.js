describe("tree service >", function () {
  beforeEach(module('app'));
  // 这里可以注入服务或控制器，注入器会忽略名称两端的下划线
  var tree;
  beforeEach(inject(function (_tree_) {
    tree = _tree_;
  }));
  it('选中父节点时，自动选中所有各级子节点', function () {
  });
});
