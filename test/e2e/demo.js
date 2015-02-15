'use strict';

describe('e2e范例，如果修改了首页，请修改本测试', function () {

  beforeEach(function () {
    browser.get('http://localhost:5000');
  });

  it('默认的标题是WeBank', function() {
    expect(browser.getTitle()).toBe('Showcase');
  });
  it('默认的Home页内容', function () {
    expect(element(by.binding('vm.name')).getText()).toBe('Hello, World');
    element(by.model('vm.name')).clear().sendKeys('Ketty');
    expect(element(by.binding('vm.name')).getText()).toBe('Hello, Ketty');
  });
});
