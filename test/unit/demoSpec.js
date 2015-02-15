describe("单元测试的范例 >", function () {
  beforeEach(module('app'));
  // 这里可以注入服务或控制器，注入器会忽略名称两端的下划线
  // var Service;
  // beforeEach(inject(function(_Service_) {
  //   Service = _Service_;
  // }));
  it("1当然要等于1", function () {
    expect(1).toBe(1);
  });
});
