'use strict';

var webpackDevConfig = require('./webpack.hot.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    'pkg': pkgConfig,

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        contentBase: './dist/'
      },

      start: {
        keepAlive: true
      }
    },

    'open': {
      options: {
        delay: 500
      },
      dist: {
        path: 'http://localhost:8000/'
      }
    },

    'exec': {
      watch: pkgConfig.scripts.watch,
      launch_nw: '/Applications/nwjs.app/Contents/MacOS/nwjs dist'
    },

    'concurrent': {
      target: {
        tasks: ['exec:watch', 'exec:launch_nw'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('serve-web', function (target) {
    grunt.task.run([
      'open:dist',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('serve-nw', function () {
    grunt.task.run([
      'concurrent'
    ]);
  });

  grunt.registerTask('default', []);
};
