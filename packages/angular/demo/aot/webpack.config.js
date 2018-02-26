const webpack = require('webpack')

module.exports = {
  entry: {
    index: './packages/angular/demo/aot/index'
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
    })
  ],
  resolve: {
    alias: {
      'markdown-it': 'markdown-it/dist/markdown-it.min.js'
    }
  }
}
