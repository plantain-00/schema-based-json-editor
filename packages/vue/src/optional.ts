import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { optionalTemplateHtml, optionalTemplateHtmlStatic } from './variables'

@Component({
  render: optionalTemplateHtml,
  staticRenderFns: optionalTemplateHtmlStatic,
  props: ['required', 'value', 'isReadOnly', 'theme', 'locale']
})
export class Optional extends Vue {
  required: boolean | undefined
  value: common.ValueType | undefined
  isReadOnly: boolean | undefined
  theme!: common.Theme
  locale!: common.Locale

  get hasOptionalCheckbox () {
    return !this.required && (this.value === undefined || !this.isReadOnly)
  }
}
