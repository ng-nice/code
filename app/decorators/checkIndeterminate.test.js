'use strict';

describe('checkIndeterminate指令 >', function () {
  beforeEach(module('app'));
  var $compile;
  var $rootScope;
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  it('使用常量作为默认值', function () {
    var scope = $rootScope.$new(true);
    var dom = $compile('<input type="checkbox" bf-check-indeterminate="true" />')(scope);
    scope.$digest();
    expect(dom[0].indeterminate).toBeTruthy();
  });
  it('通过代码修改变量', function() {
    var scope = $rootScope.$new(true);
    scope.checked = true;
    var dom = $compile('<input type="checkbox" bf-check-indeterminate="checked" />')(scope);
    scope.$digest();
    expect(dom[0].indeterminate).toBeTruthy();
    scope.checked = false;
    scope.$digest();
    expect(dom[0].indeterminate).toBeFalsy();
  })
});
