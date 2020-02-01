// Karma configuration
// Generated on Fri Jan 31 2020 15:56:50 GMT+0800 (中国标准时间)
// const path = require('path')
const webpack_config = {
  mode: 'none',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        enforce: 'pre',
        exclude: /(node_modules)/
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
}

module.exports = function (config) {
  const configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    plugins: [
      'karma-webpack',
      'karma-coverage-istanbul-reporter',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-coverage',
    ],


    // list of files / patterns to load in the browser
    files: [
      'tests/*.test.js',
      'tests/**/*.test.js'
    ],



    // list of files / patterns to exclude
    exclude: [
      '**/node_modules/**/*.test.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/**/*.test.js': ['webpack', 'coverage']
    },

    // webpack: webpackConfig,
    webpack: webpack_config,


    webpackMiddleware: {
      noInfo: false,
      stats: {
        chunks: false,
        timings: false,
        errorDetails: true
      }
    },

    // optionally, configure the reporter
    coverageReporter: {
      dir: './coverage/',
      type: 'html',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: 'coverage/',
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  }

  console.log('process.env.TRAVIS', process.env.TRAVIS)
  if (process.env.TRAVIS) {
    // configuration.browsers = ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox']
    // you can define custom flags
    // configuration.customLaunchers = {
    //   ChromeHeadlessNoSandbox: {
    //     base: 'ChromeHeadless',
    //     flags: ['--no-sandbox']
    //   }
    // }
    configuration.singleRun = true
  }

  config.set(configuration)
}
