import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'packages/vue/dist/index.js',
  plugins: [
    resolve({ browser: true }),
    uglify(),
    commonjs()
  ],
  output: {
    name: 'JSONEditor',
    file: 'packages/vue/dist/vue-schema-based-json-editor.min.js',
    format: 'umd'
  },
  external: [
    'vue'
  ]
}
