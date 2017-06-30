const webpack = require('webpack')
const path = require('path')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['index', 'editor', 'vendor']
  })
]

const resolve = {
  alias: {
    'markdown-it': 'markdown-it/dist/markdown-it.min.js',
    'vue$': 'vue/dist/vue.js'
  }
}

module.exports = [
  {
    entry: {
      'index': './demo/vue/index',
      'vendor': './demo/vue/vendor',
      'editor': './demo/vue/editor'
    },
    output: {
      path: path.resolve(__dirname, 'vue'),
      filename: '[name].bundle.js'
    },
    plugins,
    resolve
  },
  {
    entry: {
      'index': './demo/react/index',
      'vendor': './demo/react/vendor',
      'editor': './demo/react/editor'
    },
    output: {
      path: path.resolve(__dirname, 'react'),
      filename: '[name].bundle.js'
    },
    plugins,
    resolve
  },
  {
    entry: {
      'index': './demo/angular/index',
      'vendor': './demo/angular/vendor',
      'editor': './demo/angular/editor'
    },
    output: {
      path: path.resolve(__dirname, 'angular'),
      filename: '[name].bundle.js'
    },
    plugins,
    resolve
  }
]
