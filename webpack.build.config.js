const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const { version, name, homepage, license } = require('./package.json')

function getBanner() {
  return ` ${name} v ${version}\n ${homepage}\n built at ${new Date().toGMTString()}\n ${license} License`
}

const config = {
  entry: {
    malyan: './src/index',
  },
  output: {
    filename: '[name].webpack.min.js',
    path: path.resolve(__dirname, 'dist'),
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
      banner: getBanner(),
      raw: false
    }),
  ],
}

module.exports = config