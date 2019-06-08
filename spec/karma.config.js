const webpackConfig = require('./webpack.config.js')

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (karma) {
  const config = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '**/*Spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: karma.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {},
    preprocessors: {
      '**/*Spec.js': ['webpack']
    }
  }

  if (!process.env.APPVEYOR) {
    config.browsers.push('Firefox')
  }

  karma.set(config)
}
