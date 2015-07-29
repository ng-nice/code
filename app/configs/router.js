'use strict';

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('default', {
    url: '',
    templateUrl: 'controllers/home/index.html',
    controller: 'HomeIndexController as vm'
  });
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'controllers/home/index.html',
    controller: 'HomeIndexController as vm'
  });

  $stateProvider.state('notFound', {
    url: '/notFound',
    templateUrl: 'controllers/home/notFound.html',
    controller: 'HomeNotFoundController as vm'
  });
  $urlRouterProvider.otherwise('/notFound');

  $stateProvider.state('reader', {
    url: '/reader',
    template: '<div ui-view></div>',
    abstract: true
  });
  $stateProvider.state('reader.create', {
    url: '/create',
    templateUrl: 'controllers/reader/create.html',
    controller: 'ReaderCreateController as vm'
  });
  $stateProvider.state('reader.list', {
    url: '/list',
    templateUrl: 'controllers/reader/list.html',
    controller: 'ReaderListController as vm'
  });

  $stateProvider.state('thread', {
    url: '/thread',
    template: '<div ui-view></div>',
    abstract: true
  });
  $stateProvider.state('thread.list', {
    url: '/list',
    templateUrl: 'controllers/thread/list.html',
    controller: 'ThreadListController as vm'
  });
  $stateProvider.state('thread.tree', {
    url: '/tree',
    templateUrl: 'controllers/thread/tree.html',
    controller: 'ThreadTreeController as vm'
  });
  $stateProvider.state('thread.show', {
    url: '/:id/show?title&poster',
    templateUrl: 'controllers/thread/show.html',
    controller: 'ThreadShowController as vm'
  });
});
