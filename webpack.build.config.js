const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const version = require('./package.json').version
const banner =
  '/**\n' +
  ' * malyan v' + version + '\n' +
  ' * https://github.com/HarryChen0506/malyan\n' +
  ' * MIT License\n' +
  ' */\n'
const config = {
  entry: {
    app: './src/index',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: {
      commonjs: 'malyan',
      amd: 'malyan',
      root: 'Malyan'
    },
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  externals: [],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CleanWebpackPlugin(['lib']),
    new webpack.BannerPlugin({
      banner,
      raw: false
    }),
  ],
}

module.exports = config