const webpackConfig = require('./webpack.config.js')

const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision
const Downloader = require('puppeteer/utils/ChromiumDownloader')
const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision)
process.env.CHROME_BIN = revisionInfo.executablePath

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
    preprocessors: {
      '**/*Spec.js': ['webpack']
    }
  }

  if (!process.env.APPVEYOR) {
    config.browsers.push('Firefox')
  }

  karma.set(config)
}
