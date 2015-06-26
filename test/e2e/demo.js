'use strict';

var HomePage = require('./pages/HomePage');

describe('e2e范例，如果修改了首页，请修改本测试', function () {
  var homePage;
  beforeEach(function () {
    homePage = new HomePage();
    homePage.get();
  });

  it('默认的标题是Showcase', function() {
    expect(homePage.title()).toBe('Showcase');
  });
  it('输入用户名后应该回显', function() {
    expect(homePage.nameEcho.getText()).toBe('Hello,');
    homePage.name.sendKeys('test');
    expect(homePage.nameEcho.getText()).toBe('Hello,test');
  });
});
