import Vue from 'vue'
import Component from 'vue-class-component'
import { editorTemplateHtml, editorTemplateHtmlStatic } from './variables'

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
    'minItemCountIfNeedFilter'
  ]
})
export class Editor extends Vue {

}
