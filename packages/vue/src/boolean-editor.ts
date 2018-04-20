import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { booleanEditorTemplateHtml, booleanEditorTemplateHtmlStatic } from './variables'

@Component({
  render: booleanEditorTemplateHtml,
  staticRenderFns: booleanEditorTemplateHtmlStatic,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description
  },
  props: ['schema', 'initialValue', 'title', 'theme', 'icon', 'locale', 'readonly', 'required', 'hasDeleteButton']
})
export class BooleanEditor extends Vue {
  schema!: common.BooleanSchema
  initialValue?: boolean
  title!: string
  theme!: common.Theme
  icon!: common.Icon
  locale!: common.Locale
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean

  value?: boolean = false
  buttonGroupStyle = common.buttonGroupStyleString

  beforeMount () {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean
    this.$emit('update-value', { value: this.value, isValid: true })
  }

  get isReadOnly () {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction () {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get titleToShow () {
    return common.getTitle(this.title, this.schema.title)
  }
  get booleanOptions () {
    return [
      {
        value: true,
        label: this.locale.info.true
      },
      {
        value: false,
        label: this.locale.info.false
      }
    ]
  }
  get className () {
    const rowClass = this.theme.row
    return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
  }

  onChange () {
    this.value = !this.value
    this.$emit('update-value', { value: this.value, isValid: true })
  }
  toggleOptional () {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined
    this.$emit('update-value', { value: this.value, isValid: true })
  }
}
