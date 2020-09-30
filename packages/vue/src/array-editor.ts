import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { Select2 } from "select2-vue-component"
import { Icon } from './icon'
import { Editor } from './editor'
import { Optional } from './optional'
import { Description } from './description'
import { arrayEditorTemplateHtml } from './variables'

export const ArrayEditor = defineComponent({
  props: {
    schema: {
      type: Object as PropType<common.ArraySchema>,
      required: true,
    },
    initialValue: Array as PropType<common.ValueType[]>,
    title: [String, Number],
    getReference: {
      type: Function as PropType<(name: string) => common.Schema | undefined>,
      required: true,
    },
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
    dragula: Function as PropType<common.Dragula | undefined>,
    md: Object,
    hljs: Object,
    forceHttps: Boolean,
    disableCollapse: Boolean,
    noSelect2: Boolean,
    minItemCountIfNeedFilter: Number,
    monacoEditor: Object,
  },
  data: () => {
    return {
      renderSwitch: 1,
      collapsed: false as boolean | undefined,
      value: [] as common.ValueType[] | undefined,
      errorMessage: '',
      buttonGroupStyleString: common.buttonGroupStyleString,
      filter: '',
      invalidIndexes: [] as number[],
      drak: null as dragula.Drake | null,
    }
  },
  computed: {
    filteredValues(): common.ValueType[] {
      return this.getValue.map((p, i) => ({ p, i }))
        .filter(({ p, i }) => common.filterArray(p, i, this.schema.items, this.filter))
    },
    getValue(): common.ValueType[] {
      if (this.value !== undefined && !this.collapsed) {
        return this.value
      }
      return []
    },
    isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
    hasDeleteButtonFunction(): boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
    hasAddButton(): boolean {
      return !this.isReadOnly && this.value !== undefined && !this.schema.enum
    },
    titleToShow(): string {
      return common.getTitle(this.title, this.schema.title)
    },
    showFilter(): boolean {
      const minItemCountIfNeedFilter = typeof this.minItemCountIfNeedFilter === 'number' ? this.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
      return this.getValue.length >= minItemCountIfNeedFilter
    },
    className(): string {
      const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
      return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
    },
    options(): { value: string | number, label: string | number }[] {
      return common.getOptions(this.schema)
    },
  },
  beforeMount() {
    this.collapsed = this.schema.collapsed
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[]
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  },
  beforeUnmount() {
    if (this.drak) {
      this.drak.destroy()
    }
  },
  mounted() {
    if (this.dragula) {
      const container = common.findContainer(this.$el.childNodes)
      if (container) {
        this.drak = this.dragula([container])
        this.drak!.on('drop', (el, target, source, sibling) => {
          if (this.value) {
            common.switchItem(this.value, el as HTMLElement, sibling as HTMLElement)
            this.renderSwitch = -this.renderSwitch
            this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
          }
        })
      }
    }
  },
  methods: {
    collapseOrExpand() {
      this.collapsed = !this.collapsed
    },
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
    },
    addItem() {
      this.value!.push(common.getDefaultValue(true, this.schema.items, undefined)!)
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
    },
    onDeleteFunction(i: number) {
      this.value!.splice(i, 1)
      this.renderSwitch = -this.renderSwitch
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
    },
    onChange(i: number, { value, isValid }: common.ValidityValue<common.ValueType>) {
      this.value![i] = value
      this.validate()
      common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i)
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
    },
    onFilterChange(e: { target: { value: string } }) {
      this.filter = e.target.value
    },
    isChecked(value: any) {
      return this.value && this.value.indexOf(value) !== -1
    },
    onChangeCheckbox(value: any) {
      if (this.value) {
        const index = this.value.indexOf(value)
        if (index !== -1) {
          this.value.splice(index, 1)
        } else {
          this.value.push(value)
        }
        this.validate()
        this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
      }
    },
    onChangeSelect2(value: any) {
      this.value = value
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
    },
    validate() {
      this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale)
    },
  },
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
    editor: Editor,
    select2: Select2,
  },
  render: arrayEditorTemplateHtml,
})
