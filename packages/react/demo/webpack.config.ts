import * as webpack from 'webpack'

export default {
  mode: process.env.NODE_ENV,
  entry: {
    index: './packages/react/demo/index'
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
      'markdown-it': 'markdown-it/dist/markdown-it.min.js'
    }
  },
  externals: {
    'monaco-editor': 'monaco'
  }
} as webpack.Configuration
