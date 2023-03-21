import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'packages/react/dist/index.js',
  plugins: [
    resolve(),
    uglify(),
    commonjs()
  ],
  output: {
    name: 'JSONEditor',
    file: 'packages/react/dist/react-schema-based-json-editor.min.js',
    format: 'umd'
  },
  external: [
    'react',
    'react-dom'
  ]
}
