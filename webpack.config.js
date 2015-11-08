/*
 * Webpack base configuration
 */

'use strict';

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index.js'
  ],

  output: {
    filename: 'assets/main.js',
    path: 'dist/'
  },

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
