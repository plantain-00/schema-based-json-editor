module.exports = {
  base: 'packages/vue/src/',
  files: [
    'packages/vue/src/*.template.html'
  ],
  /**
   * @argument {string} file
   */
  handler: file => {
    if (file.endsWith('index.template.html')) {
      return { type: 'vue', name: 'JSONEditor', path: './index' }
    }
    if (file.endsWith('array-editor.template.html')) {
      return { type: 'vue', name: 'ArrayEditor', path: './array-editor' }
    }
    if (file.endsWith('boolean-editor.template.html')) {
      return { type: 'vue', name: 'BooleanEditor', path: './boolean-editor' }
    }
    if (file.endsWith('null-editor.template.html')) {
      return { type: 'vue', name: 'NullEditor', path: './null-editor' }
    }
    if (file.endsWith('number-editor.template.html')) {
      return { type: 'vue', name: 'NumberEditor', path: './number-editor' }
    }
    if (file.endsWith('object-editor.template.html')) {
      return { type: 'vue', name: 'ObjectEditor', path: './object-editor' }
    }
    if (file.endsWith('string-editor.template.html')) {
      return { type: 'vue', name: 'StringEditor', path: './string-editor' }
    }
    if (file.endsWith('editor.template.html')) {
      return { type: 'vue', name: 'Editor', path: './editor' }
    }
    if (file.endsWith('icon.template.html')) {
      return { type: 'vue', name: 'Icon', path: './icon' }
    }
    if (file.endsWith('description.template.html')) {
      return { type: 'vue', name: 'Description', path: './description' }
    }
    if (file.endsWith('optional.template.html')) {
      return { type: 'vue', name: 'Optional', path: './optional' }
    }
    return { type: 'text' }
  },
  out: 'packages/vue/src/variables.ts'
}
