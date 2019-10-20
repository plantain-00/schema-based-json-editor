import Vue from 'vue'
import Component from 'vue-class-component'
import { editorTemplateHtml, editorTemplateHtmlStatic } from './variables'
import { Schema } from '.'

@Component({
  render: editorTemplateHtml,
  staticRenderFns: editorTemplateHtmlStatic,
  components: {
    editor: Editor
  },
  props: [
    'schema',
    'initialValue',
    'title',
    'getReference',
    'theme',
    'icon',
    'locale',
    'readonly',
    'required',
    'hasDeleteButton',
    'dragula',
    'md',
    'hljs',
    'forceHttps',
    'disableCollapse',
    'noSelect2',
    'minItemCountIfNeedFilter',
    'monacoEditor'
  ]
})
export class Editor extends Vue {
  schema!: Schema
  getReference!: (name: string) => Schema | undefined

  get realSchema() {
    if (this.schema.$ref) {
      const reference = this.getReference(this.schema.$ref)
      if (reference) {
        return reference
      }
    }
    return this.schema
  }
}
