const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  target: 'web',
  entry: {
    malyan: './src/index.js',
  },
  output: {
    filename: '[name].js',
    // library: 'Malyan',
    library: {
      commonjs: 'malyan',
      amd: 'malyan',
      root: 'Malyan'
    },
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, './dist'),
    umdNamedDefine: true
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, './'),
    publicPath: '/dist/',
    port: '8080',
    host: '0.0.0.0', //支持ip来访问页面，否则只能通过localhost:8080来访问
    historyApiFallback: true, //所有404页面能跳转到index.html
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('eslint-formatter-pretty'),
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = config