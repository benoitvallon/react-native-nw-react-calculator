/*
 * Webpack development server configuration
 */

'use strict';

require('babel/register');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

module.exports = Object.assign({}, baseConfig, {
  debug: true,

  entry: [
    'webpack/hot/only-dev-server'
  ].concat(baseConfig.entry),

  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});

module.exports.module.loaders[0].loader = 'react-hot!babel-loader';
