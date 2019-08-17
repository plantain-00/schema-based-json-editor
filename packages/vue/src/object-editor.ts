import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { Editor } from './editor'
import { objectEditorTemplateHtml, objectEditorTemplateHtmlStatic } from './variables'

@Component({
  render: objectEditorTemplateHtml,
  staticRenderFns: objectEditorTemplateHtmlStatic,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
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
    'minItemCountIfNeedFilter',
    'monacoEditor'
  ]
})
export class ObjectEditor extends Vue {
  schema!: common.ObjectSchema
  initialValue?: { [name: string]: common.ValueType }
  title!: string
  icon!: common.Icon
  locale!: common.Locale
  theme!: common.Theme
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean
  minItemCountIfNeedFilter!: boolean

  collapsed? = false
  value?: { [name: string]: common.ValueType } = {}
  buttonGroupStyle = common.buttonGroupStyleString
  errorMessage? = ''
  filter = ''
  private invalidProperties: string[] = []
  private properties: { property: string; schema: common.Schema }[] = []
  private watchedProperties: string[] = []

  beforeMount() {
    this.collapsed = this.schema.collapsed
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType }
    this.validate()
    if (this.value !== undefined) {
      for (const property in this.schema.properties) {
        if (this.schema.properties.hasOwnProperty(property)) {
          const schema = this.schema.properties[property]
          const required = this.schema.required && this.schema.required.some(r => r === property)
          this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType }
          this.properties.push({
            property,
            schema
          })
        }
      }
      this.properties.sort(common.compare)
    }
    for (const property in this.schema.properties) {
      const schema = this.schema.properties[property]
      if (schema && schema.requiredWhen) {
        this.watchedProperties.push(schema.requiredWhen[0])
      }
    }
    this.$emit('update-value', { value: this.value, isValid: true })
  }

  get filteredProperties() {
    return this.properties.filter(p => common.filterObject(p, this.filter))
  }
  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get titleToShow() {
    if (this.hasDeleteButton) {
      return common.getTitle(common.findTitle(this.value, this.properties), this.title, this.schema.title)
    }
    return common.getTitle(this.title, this.schema.title)
  }
  get showFilter() {
    const propertyCount = this.properties.filter(p => this.isRequired(p.property) !== false).length
    const minItemCountIfNeedFilter = typeof this.minItemCountIfNeedFilter === 'number' ? this.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
    return propertyCount >= minItemCountIfNeedFilter
  }
  get className() {
    const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
    return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
  }

  isRequired(property: string) {
    return common.isRequired(this.schema.required, this.value, this.schema, property)
  }
  collapseOrExpand() {
    this.collapsed = !this.collapsed
  }
  toggleOptional() {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: this.invalidProperties.length === 0 })
  }
  onChange(property: string, { value, isValid }: common.ValidityValue<common.ValueType>) {
    this.value![property] = value
    for (const p in this.schema.properties) {
      if (this.isRequired(p) === false) {
        this.value![p] = undefined
      }
    }
    this.validate()
    if (this.watchedProperties.some(p => p === property)) {
      this.$forceUpdate()
    }
    common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property)
    this.$emit('update-value', { value: this.value, isValid: this.invalidProperties.length === 0 })
  }
  onFilterChange(e: { target: { value: string } }) {
    this.filter = e.target.value
  }
  private validate() {
    this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale)
  }
}
