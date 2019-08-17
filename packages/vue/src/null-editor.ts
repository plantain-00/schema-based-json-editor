import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { nullEditorTemplateHtml, nullEditorTemplateHtmlStatic } from './variables'

@Component({
  render: nullEditorTemplateHtml,
  staticRenderFns: nullEditorTemplateHtmlStatic,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description
  },
  props: ['schema', 'initialValue', 'title', 'theme', 'icon', 'locale', 'readonly', 'required', 'hasDeleteButton']
})
export class NullEditor extends Vue {
  schema!: common.ArraySchema
  initialValue?: null
  title!: string
  theme!: common.Theme
  icon!: common.Icon
  locale!: common.Locale
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean

  value? = null
  buttonGroupStyle = common.buttonGroupStyleString

  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null
    this.$emit('update-value', { value: this.value, isValid: true })
  }

  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get titleToShow() {
    return common.getTitle(this.title, this.schema.title)
  }

  toggleOptional() {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined
    this.$emit('update-value', { value: this.value, isValid: true })
  }
}
