'use strict';

module.exports = function (config) {

  config.set({
    basePath: '..', //!\\ Ignored through gulp-karma //!\\

    files: [ //!\\ Ignored through gulp-karma //!\\
      'app/libraries/angular/angular.js',
      'app/libraries/angular-mocks/angular-mocks.js',
      'app/libraries/ionic/release/js/ionic.bundle.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ]
  });

};
