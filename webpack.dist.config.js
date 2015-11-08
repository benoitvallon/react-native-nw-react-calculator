/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

require('babel/register');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

module.exports = Object.assign({}, baseConfig, {
  devtool: false,

  plugins: baseConfig.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ])
});
