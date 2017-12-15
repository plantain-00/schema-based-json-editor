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
    output: {
      comments: false
    },
    exclude: [
    ]
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['index', 'editor', 'vendor']
  })
]

const resolve = {
  alias: {
    'markdown-it': 'markdown-it/dist/markdown-it.min.js',
    'vue$': 'vue/dist/vue.esm.js'
  }
}

module.exports = [
  {
    entry: {
      'index': './packages/vue/demo/index',
      'vendor': './packages/vue/demo/vendor',
      'editor': './packages/vue/demo/editor'
    },
    output: {
      path: path.resolve(__dirname, 'packages/vue/demo'),
      filename: '[name].bundle.js'
    },
    plugins,
    resolve
  },
  {
    entry: {
      'index': './packages/react/demo/index',
      'vendor': './packages/react/demo/vendor',
      'editor': './packages/react/demo/editor'
    },
    output: {
      path: path.resolve(__dirname, 'packages/react/demo'),
      filename: '[name].bundle.js'
    },
    plugins
  },
  {
    entry: {
      'index': './packages/angular/demo/jit/index',
      'vendor': './packages/angular/demo/jit/vendor',
      'editor': './packages/angular/demo/jit/editor'
    },
    output: {
      path: path.resolve(__dirname, 'packages/angular/demo/jit'),
      filename: '[name].bundle.js'
    },
    plugins
  },
  {
    entry: {
      'index': './packages/angular/demo/aot/index'
    },
    output: {
      path: path.resolve(__dirname, 'packages/angular/demo/aot'),
      filename: '[name].bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        exclude: [
        ]
      })
    ]
  }
]
