var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './src/client/index.js',
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve('public'),
    publicPath: 'http://localhost:8080/public'
  },
  resolve: {
    root: [
      path.resolve(),
      path.resolve('src', 'client')
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        include: path.resolve('src', 'client'),
        exclude: /node_modules/,
      },
    ]
  },
  sassLoader: {
    includePaths: [path.resolve('src', 'client', 'stylesheets')],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
