'use strict';

describe('filter > page >', function () {
  beforeEach(module('com.ngnice.app'));
  var pageFilter;
  beforeEach(inject(function (_pageFilter_) {
    pageFilter = _pageFilter_;
  }));

  var items;
  beforeEach(function () {
    items = [1, 2, 3, 4, 5, 6];
  });
  it('第一页为满页时', function() {
    expect(pageFilter(items, 0, 3)).toEqual([1,2,3]);
  });
  it('第一页为不满页时', function() {
    expect(pageFilter(items, 0, 7)).toEqual([1,2,3,4,5,6]);
  });
  it('最后一页为满页时', function() {
    expect(pageFilter(items, 1, 3)).toEqual([4,5,6]);
  });
  it('最后一页为不满页时', function() {
    expect(pageFilter(items, 1, 4)).toEqual([5,6]);
  });
  it('大于最大页码时', function() {
    expect(pageFilter(items, 2, 4)).toEqual([]);
  });
  it('小于最小页码时', function() {
    expect(pageFilter(items, -2, 4)).toEqual([]);
  });
});
