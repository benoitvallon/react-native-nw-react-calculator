'use strict';

var webpackDistConfig = require('./webpack.dist.config.js');
var webpackDevConfig = require('./webpack.hot.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    'pkg': pkgConfig,

    'webpack': {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

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

    'copy': {
      dist: {
        files: [
          {
            flatten: true,
            src: ['<%= pkg.src %>/index.web.html'],
            dest: '<%= pkg.dist %>/index.html'
          },
          {
            flatten: true,
            src: ['<%= pkg.src %>/favicon.ico'],
            dest: '<%= pkg.dist %>/favicon.ico'
          }
        ]
      }
    },

    'clean': {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    },

    'watch': {
      options: {
        livereload: true
      },
      build: {
        files: 'src/**/*.js',
        tasks: ['webpack']
      }
    },

    'exec': {
      launch_nw: '/Applications/nwjs.app/Contents/MacOS/nwjs dist'
    },

    'concurrent': {
      target: {
        tasks: ['watch', 'exec:launch_nw'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('serve-web', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:dist']);
    }

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

  grunt.registerTask('build', ['clean', 'copy', 'webpack']);
  grunt.registerTask('default', []);
};
