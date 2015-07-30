'use strict';

describe('service > Pagination >', function() {
  beforeEach(module('com.ngnice.app'));
  var Pagination;
  beforeEach(inject(function(_Pagination_) {
    Pagination = _Pagination_;
  }));
  var pager;
  beforeEach(function() {
    pager = new Pagination({size: 5, total: 201});
  });
  it('计算总页数，尾页满', function() {
    var pager2 = new Pagination({size: 5, total: 200});
    expect(pager2.pages.length).toEqual(40);
  });
  it('计算总页数，尾页不满', function() {
    expect(pager.pages.length).toEqual(41);
  });
  it('默认起始页为0', function() {
    expect(pager.activeIndex).toEqual(0);
  });
  it('定位函数', function() {
    pager.goTo(2);
    expect(pager.activeIndex).toEqual(2);
    pager.goToNext();
    expect(pager.activeIndex).toEqual(3);
    pager.goToPrev();
    expect(pager.activeIndex).toEqual(2);
    pager.goToFirst();
    expect(pager.activeIndex).toEqual(0);
    pager.goToLast();
    expect(pager.activeIndex).toEqual(40);
    pager.go(-3);
    expect(pager.activeIndex).toEqual(37);
  });
  it('首页状态', function() {
    pager.goToFirst();
    expect(pager.first.isDisabled()).toBeTruthy();
    pager.goToNext();
    expect(pager.first.isDisabled()).toBeFalsy();
  });
  it('前一页状态', function() {
    pager.goToFirst();
    expect(pager.prev.isDisabled()).toBeTruthy();
    pager.goToNext();
    expect(pager.prev.isDisabled()).toBeFalsy();
  });
  it('下一页状态', function() {
    pager.goToLast();
    expect(pager.next.isDisabled()).toBeTruthy();
    pager.goToPrev();
    expect(pager.next.isDisabled()).toBeFalsy();
  });
  it('尾页状态', function() {
    pager.goToLast();
    expect(pager.last.isDisabled()).toBeTruthy();
    pager.goToPrev();
    expect(pager.last.isDisabled()).toBeFalsy();
  });
  it('头部页标签可见性', function() {
    pager.goToFirst();
    expect(pager.pages[0].isVisible()).toBeTruthy();
    expect(pager.pages[4].isVisible()).toBeTruthy();
    expect(pager.pages[5].isVisible()).toBeFalsy();
    // 前移两位仍不影响可见性
    pager.goToNext(2);
    expect(pager.pages[0].isVisible()).toBeTruthy();
    expect(pager.pages[4].isVisible()).toBeTruthy();
    expect(pager.pages[5].isVisible()).toBeFalsy();
  });
  it('尾部页标签可见性', function() {
    pager.goToLast();
    expect(pager.pages[40].isVisible()).toBeTruthy();
    expect(pager.pages[36].isVisible()).toBeTruthy();
    expect(pager.pages[35].isVisible()).toBeFalsy();
    // 前移两位仍不影响可见性
    pager.goToPrev(2);
    expect(pager.pages[40].isVisible()).toBeTruthy();
    expect(pager.pages[36].isVisible()).toBeTruthy();
    expect(pager.pages[35].isVisible()).toBeFalsy();
  });
  it('中部标签可见性', function() {
    pager.goTo(12);
    expect(pager.pages[9].isVisible()).toBeFalsy();
    expect(pager.pages[10].isVisible()).toBeTruthy();
    expect(pager.pages[11].isVisible()).toBeTruthy();
    expect(pager.pages[12].isVisible()).toBeTruthy();
    expect(pager.pages[13].isVisible()).toBeTruthy();
    expect(pager.pages[14].isVisible()).toBeTruthy();
    expect(pager.pages[15].isVisible()).toBeFalsy();
  });
  it('viewport必须为奇数', function() {
    expect(function() {
      return new Pagination({numPages: 6});
    }).toThrow();
  });
});
