import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { numberEditorTemplateHtml, numberEditorTemplateHtmlStatic } from './variables'

@Component({
  render: numberEditorTemplateHtml,
  staticRenderFns: numberEditorTemplateHtmlStatic,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description
  },
  props: ['schema', 'initialValue', 'title', 'theme', 'icon', 'locale', 'readonly', 'required', 'hasDeleteButton', 'noSelect2']
})
export class NumberEditor extends Vue {
  schema!: common.NumberSchema
  initialValue?: number
  title!: string
  theme!: common.Theme
  icon!: common.Icon
  locale!: common.Locale
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean
  noSelect2!: boolean

  value?: number = 0
  errorMessage?: string = ''
  buttonGroupStyle = common.buttonGroupStyleString

  onChange (e: { target: { value: string } }) {
    this.value = this.schema.type === 'integer' ? common.toInteger(e.target.value) : common.toNumber(e.target.value)
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  beforeMount () {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  get useInput () {
    return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly)
  }
  get useSelect () {
    return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly)
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

  get options () {
    return common.getOptions(this.schema)
  }

  updateSelection (value: number) {
    this.value = value
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  toggleOptional () {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }
  private validate () {
    this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale)
  }
}
