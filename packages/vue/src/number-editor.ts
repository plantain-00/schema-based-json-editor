import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { Select2 } from "select2-vue-component"
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { numberEditorTemplateHtml } from './variables'

export const NumberEditor = defineComponent({
  render: numberEditorTemplateHtml,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
    select2: Select2,
  },
  props: {
    schema: {
      type: Object as PropType<common.NumberSchema>,
      required: true,
    },
    initialValue: Number,
    title: [String, Number],
    theme: {
      type: Object as PropType<common.Theme>,
      required: true,
    },
    icon: {
      type: Object as PropType<common.Icon>,
      requried: true,
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
    noSelect2: {
      type: Boolean,
      required: true,
    },
  },
  data: () => {
    return {
      value: 0 as number | undefined,
      errorMessage: '' as string | undefined,
      buttonGroupStyle: common.buttonGroupStyleString,
    }
  },
  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  },
  computed: {
    useInput(): boolean | undefined {
      return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly)
    },
    useSelect(): boolean {
      return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly)
    },
    useSelect2Component(): boolean {
      return this.useSelect && !this.noSelect2 && this.schema.format !== 'select' && this.schema.format !== 'radiobox'
    },
    useSelectComponent(): boolean {
      return this.useSelect && (this.schema.format === 'select' || this.noSelect2)
    },
    useRadioBoxComponent(): boolean {
      return this.useSelect && this.schema.format === 'radiobox'
    },
    isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
    hasDeleteButtonFunction(): boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
    titleToShow(): string {
      return common.getTitle(this.title, this.schema.title)
    },
    options(): {
      value: string | number;
      label: string | number;
    }[] {
      return common.getOptions(this.schema)
    },
    className(): string {
      const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
      return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
    },
    step(): number | "any" | undefined {
      return common.getNumberStep(this.schema)
    },
  },
  methods: {
    onChange(e: { target: { value: string } }) {
      this.value = this.schema.type === 'integer' ? common.toInteger(e.target.value) : common.toNumber(e.target.value)
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    },
    updateSelection(value: number) {
      this.value = value
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    },
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    },
    validate() {
      this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale)
    },
  }
})
