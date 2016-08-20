'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

// Lose the webpack middleware
config.entry.shift();
config.watch = false;
config.devtool = '';
config.output.path = path.join(__dirname, 'docs');
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
  })
];


module.exports = config;
