module.exports = {
  entry: {
    index: './packages/angular/demo/aot/index'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      'markdown-it': 'markdown-it/dist/markdown-it.min.js'
    }
  }
}
