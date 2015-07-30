'use strict';

describe('测试布局组件 >', function () {
  beforeEach(module('com.ngnice.app'));
  var $compile;
  var $rootScope;
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  it('2:10布局分布', function () {
    var dom = $compile('<div app-layout></div>')($rootScope);
    // 手动调用$digest的时候才会对指令进行“编译”
    $rootScope.$digest();
    expect(dom.html()).toContain('<div class="col-md-10">');
  });
});
