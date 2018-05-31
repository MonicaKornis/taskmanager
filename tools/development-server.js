const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');

const config = require('../webpack.config.js');
const compiler = webpack(config);

const devServerConfig = {
  contentBase: path.resolve('build'),
  host: '0.0.0.0',
  hot: true,
  // inline: true,
  historyApiFallback: true,
  progress: true,
  publicPath: 'http://0.0.0.0:8080/public/',
  stats: 'errors-only',
  headers: { 'Access-Control-Allow-Origin': '*' },
}

module.exports = new WebpackDevServer(compiler, devServerConfig);
