const webpackConfig = require('./webpack.config.js')

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
    browsers: ['Firefox'],
    singleRun: true,
    concurrency: Infinity,
    webpack: webpackConfig,
    preprocessors: {
      '**/*Spec.js': ['webpack']
    }
  }

  if (!process.env.TRAVIS) {
    config.browsers.push('Chrome')
  }

  karma.set(config)
}
