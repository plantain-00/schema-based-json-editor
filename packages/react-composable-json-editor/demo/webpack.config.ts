import * as webpack from 'webpack'

export default {
  mode: process.env.NODE_ENV,
  entry: {
    index: './packages/react-composable-json-editor/demo/index'
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
  }
} as webpack.Configuration
