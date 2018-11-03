import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
export * from 'schema-based-json-editor'

import { Editor } from './editor'

import { ArrayEditor } from './array-editor'
import { BooleanEditor } from './boolean-editor'
import { NullEditor } from './null-editor'
import { NumberEditor } from './number-editor'
import { ObjectEditor } from './object-editor'
import { StringEditor } from './string-editor'
import { AnyEditor } from './any-editor'

Vue.component('array-editor', ArrayEditor)
Vue.component('boolean-editor', BooleanEditor)
Vue.component('null-editor', NullEditor)
Vue.component('number-editor', NumberEditor)
Vue.component('object-editor', ObjectEditor)
Vue.component('string-editor', StringEditor)
Vue.component('any-editor', AnyEditor)

import { indexTemplateHtml, indexTemplateHtmlStatic } from './variables'

@Component({
  render: indexTemplateHtml,
  staticRenderFns: indexTemplateHtmlStatic,
  components: {
    editor: Editor
  },
  props: [
    'schema',
    'initialValue',
    'theme',
    'icon',
    'locale',
    'readonly',
    'dragula',
    'markdownit',
    'hljs',
    'forceHttps',
    'disableCollapse',
    'noSelect2',
    'minItemCountIfNeedFilter',
    'monacoEditor'
  ]
})
export class JSONEditor extends Vue {
  theme?: string
  locale!: common.Locale
  icon?: string
  markdownit?: any
  hljs?: common.HLJS
  forceHttps?: boolean

  themeObject = common.getTheme(this.theme)
  get localeObject() {
    return common.getLocale(this.locale)
  }
  get iconObject() {
    return common.getIcon(this.icon, this.localeObject)
  }
  md = common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps)

  updateValue(value: common.ValueType) {
    this.$emit('update-value', value)
  }
}

Vue.component('json-editor', JSONEditor)
