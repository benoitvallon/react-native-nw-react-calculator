/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist/assets/'),
    filename: 'main.js'
  },
  devtool: false,
  entry: './src/index.js',
  stats: {
    colors: true,
    reasons: false
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
