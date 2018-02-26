const webpack = require('webpack')

module.exports = {
  entry: {
    index: './packages/angular/demo/jit/index',
    vendor: './packages/angular/demo/jit/vendor',
    editor: './packages/angular/demo/jit/editor'
  },
  output: {
    path: __dirname,
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['index', 'editor', 'vendor']
    })
  ],
  resolve: {
    alias: {
      'markdown-it': 'markdown-it/dist/markdown-it.min.js'
    }
  }
}
