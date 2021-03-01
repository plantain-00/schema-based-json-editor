import * as webpack from 'webpack'

export default {
  mode: process.env.NODE_ENV,
  entry: {
    index: './packages/vue/demo/index'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
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
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'markdown-it': 'markdown-it/dist/markdown-it.min.js',
      'vue$': 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  externals: {
    'monaco-editor': 'monaco'
  }
} as webpack.Configuration
