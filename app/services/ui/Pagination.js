'use strict';

angular.module('app').factory('Pagination', function PaginationFactory() {
  // angular will store the `Pagination` as a singleton
  function BasePage(pagination) {
    this.pagination = pagination;
    this.currentIndex = function () {
      return this.index;
    };
    this.isVisible = function () {
      return true;
    };
    this.isActive = function () {
      return this.currentIndex() === this.pagination.activeIndex;
    };
    this.activate = function () {
      this.pagination.goTo(this.currentIndex());
    };
    this.isDisabled = function () {
      return this.disabled || this.pagination.activeIndex === this.currentIndex();
    };
    this.disable = function () {
      this.disabled = true;
    };
    this.label = function () {
      return '';
    };
    this.css = function (defaultClasses) {
      return angular.extend({active: this.isActive(), disabled: this.isDisabled()}, defaultClasses);
    };
  }

  function Page(pagination, index) {
    BasePage.call(this, pagination);
    this.index = index;
    var numPages = pagination.numPages;
    var halfNumPages = Math.floor(numPages / 2);
    this.isVisible = function () {
      var current = this.currentIndex();
      var from = this.pagination.activeIndex - halfNumPages;
      // 如果位于头部，则[0,count)可见
      if (from < 0) {
        from = 0;
        return current >= from && current < from + numPages;
      }

      var to = this.pagination.activeIndex + halfNumPages;
      // 如果位于尾部，则(length - count, length - 1]可见
      if (to >= this.pagination.pageCount()) {
        to = this.pagination.pageCount() - 1;
        return current > to - numPages && current <= to;
      }
      // 如果位于中间，则[from, to]可见
      return current >= from && current <= to;
    };
    this.label = function () {
      return this.index + 1;
    };
  }

  Page.prototype = BasePage;
  function FirstPage(pagination) {
    BasePage.call(this, pagination);
    this.index = 0;
    this.isVisible = function () {
      return true;
    };
    this.label = function () {
      return 'First';
    };
  }

  FirstPage.prototype = BasePage;
  function LastPage(pagination) {
    BasePage.call(this, pagination);
    this.currentIndex = function () {
      return this.pagination.pages.length - 1;
    };
    this.label = function () {
      return 'Last';
    };
  }

  LastPage.prototype = BasePage;
  function PrevPage(pagination) {
    BasePage.call(this, pagination);
    this.currentIndex = function () {
      return Math.max(this.pagination.activeIndex - 1, 0);
    };
    this.label = function () {
      return 'Prev';
    }
  }

  PrevPage.prototype = BasePage;
  function NextPage(pagination) {
    BasePage.call(this, pagination);
    this.currentIndex = function () {
      return Math.min(this.pagination.activeIndex + 1, this.pagination.pageCount() - 1);
    };
    this.label = function () {
      return 'Next';
    };
  }

  NextPage.prototype = BasePage;

  // {size: 5, total: 20, numPages: 5}
  // size: 页大小，total：总数据条数，numPages：最多显示多少个页标签
  function Pagination(options) {
    this.options = options;
    this.pages = [];
    this.activeIndex = 0;
    this.numPages = options.numPages || 5;
    if (this.numPages % 2 === 0) {
      throw new Error('numPages must be even', 'numPages');
    }
    this.pageCount = function () {
      return this.pages.length;
    };
    this.goTo = function (index) {
      this.activeIndex = index;
    };
    this.go = function (step) {
      this.goTo(this.activeIndex + step);
    };
    this.goToPrev = function () {
      this.go(-1);
    };
    this.goToNext = function () {
      this.go(1);
    };
    this.goToFirst = function () {
      this.goTo(0);
    };
    this.goToLast = function () {
      this.goTo(this.pages.length - 1);
    };
    this.first = new FirstPage(this);
    this.last = new LastPage(this);
    this.prev = new PrevPage(this);
    this.next = new NextPage(this);
    for (var i = 0; i < Math.ceil(options.total / options.size); ++i) {
      this.pages.push(new Page(this, i));
    }
  }

  return Pagination;
});
