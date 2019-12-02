const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
const version = require("./package.json").version;
const banner =
  "/**\n" +
  " * malyan v" + version + "\n" +
  " * https://github.com/HarryChen0506/malyan\n" +
  " * MIT License\n" +
  " */\n";
const config = {
  entry: {
    app: './src/index',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: "Malyan",
    libraryTarget: "var"
  },
  externals: [],
  mode: 'production',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
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
            limit: 20000,
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['lib']),
    new webpack.BannerPlugin({
      banner,
      raw: false
    }),
  ],
};

module.exports = config;