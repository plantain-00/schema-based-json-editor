const webpack = require('webpack')

module.exports = {
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
