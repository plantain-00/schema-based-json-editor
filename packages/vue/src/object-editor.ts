import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { Select2 } from "select2-vue-component"
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { Editor } from './editor'
import { objectEditorTemplateHtml } from './variables'

export const ObjectEditor = defineComponent({
  render: objectEditorTemplateHtml,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
    editor: Editor,
    select2: Select2,
  },
  props: {
    schema: {
      type: Object as PropType<common.ObjectSchema>,
      required: true,
    },
    initialValue: Object as PropType<{ [name: string]: common.ValueType }>,
    title: [String, Number],
    getReference: {
      type: Function as PropType<(ref: string) => common.Schema | undefined>,
      required: true,
    },
    theme: {
      type: Object as PropType<common.Theme>,
      required: true,
    },
    icon: {
      type: Object as PropType<common.Icon>,
      required: true,
    },
    locale: {
      type: Object as PropType<common.Locale>,
      required: true,
    },
    readonly: Boolean,
    required: Boolean,
    hasDeleteButton: {
      type: Boolean,
      required: true,
    },
    dragula: Function as PropType<common.Dragula | undefined>,
    md: Object,
    hljs: Object,
    forceHttps: Boolean,
    disableCollapse: Boolean,
    noSelect2: Boolean,
    minItemCountIfNeedFilter: Number,
    monacoEditor: Object as PropType<common.MonacoEditor>,
  },
  data: () => {
    return {
      collapsed: false as boolean | undefined,
      value: {} as { [name: string]: common.ValueType } | undefined,
      buttonGroupStyle: common.buttonGroupStyleString,
      errorMessage: '' as string | undefined,
      filter: '',
      invalidProperties: [] as string[],
      properties: [] as { property: string; schema: common.Schema; propertyName: string }[],
      watchedProperties: [] as string[],
    }
  },
  beforeMount() {
    this.collapsed = this.schema.collapsed
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType }
    this.validate()
    if (this.value !== undefined) {
      for (const property in this.schema.properties) {
        if (this.schema.properties.hasOwnProperty(property)) {
          const schema = this.schema.properties[property]
          const propertyName = schema.propertyName || property
          if (this.isRequired(property) !== false) {
            const required = this.schema.required && this.schema.required.some(r => r === property)
            this.value[propertyName] = common.getDefaultValue(required, schema, this.value[propertyName]) as { [name: string]: common.ValueType }
          }
          this.properties.push({
            propertyName,
            property,
            schema
          })
        }
      }
      this.properties.sort(common.compare)
    }
    for (const property in this.schema.properties) {
      const schema = this.schema.properties[property]
      if (schema && schema.requiredWhen && !this.watchedProperties.includes(schema.requiredWhen[0])) {
        this.watchedProperties.push(schema.requiredWhen[0])
      }
    }
    this.$emit('update-value', { value: this.value, isValid: true })
  },
  computed: {
    filteredProperties(): { property: string; schema: common.Schema; propertyName: string }[] {
      return this.properties.filter(p => common.filterObject(p, this.filter))
    },
    isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
    hasDeleteButtonFunction(): boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
    titleToShow(): string {
      if (this.hasDeleteButton) {
        return common.getTitle(common.findTitle(this.value, this.properties), this.title, this.schema.title)
      }
      return common.getTitle(this.title, this.schema.title)
    },
    showFilter(): boolean {
      const propertyCount = this.properties.filter(p => this.isRequired(p.property) !== false).length
      const minItemCountIfNeedFilter = typeof this.minItemCountIfNeedFilter === 'number' ? this.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
      return propertyCount >= minItemCountIfNeedFilter
    },
    className(): string {
      const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
      return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
    },
  },
  methods: {
    isRequired(property: string) {
      return common.isRequired(this.schema.required, this.value, this.schema, property)
    },
    collapseOrExpand() {
      this.collapsed = !this.collapsed
    },
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: this.invalidProperties.length === 0 })
    },
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
    },
    onFilterChange(e: { target: { value: string } }) {
      this.filter = e.target.value
    },
    validate() {
      this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale)
    },
  }
})
