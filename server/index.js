'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(config);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(webpackHot(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'examples/index_dev.html'));
});


app.listen(3000, 'localhost', () => {
  console.log('Listening at http://localhost:3000'); // eslint-disable-line
});
