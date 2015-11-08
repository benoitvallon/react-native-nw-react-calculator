'use strict';

var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/__test__/helpers/**/*.js',
      'src/__test__/spec/components/**/*.js',
      'src/__test__/spec/stores/**/*.js',
      'src/__test__/spec/actions/**/*.js'
    ],
    preprocessors: {
      'src/__test__/spec/components/**/*.js': ['webpack'],
      'src/__test__/spec/stores/**/*.js': ['webpack'],
      'src/__test__/spec/actions/**/*.js': ['webpack']
    },
    webpack: {
      cache: true,
      module: webpackConfig.module
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true
  });
};
