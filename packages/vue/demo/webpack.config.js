const webpack = require('webpack')

module.exports = {
  entry: {
    index: './packages/vue/demo/index',
    vendor: './packages/vue/demo/vendor',
    editor: './packages/vue/demo/editor'
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
      'markdown-it': 'markdown-it/dist/markdown-it.min.js',
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
