module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './packages/angular/demo/jit/index'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    alias: {
      'markdown-it': 'markdown-it/dist/markdown-it.min.js'
    }
  },
  externals: {
    'monaco-editor': 'monaco'
  }
}
