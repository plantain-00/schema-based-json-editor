import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'packages/react-composable-json-editor/dist/index.js',
  plugins: [
    resolve({ browser: true }),
    uglify(),
    commonjs()
  ],
  output: {
    name: 'JSONEditor',
    file: 'packages/react-composable-json-editor/dist/react-composable-json-editor.min.js',
    format: 'umd'
  },
  external: [
    'react',
    'react-dom'
  ]
}
