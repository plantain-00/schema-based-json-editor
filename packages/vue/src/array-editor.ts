import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Editor } from './editor'
import { Optional } from './optional'
import { Description } from './description'
import { arrayEditorTemplateHtml, arrayEditorTemplateHtmlStatic } from './variables'

@Component({
  render: arrayEditorTemplateHtml,
  staticRenderFns: arrayEditorTemplateHtmlStatic,
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
export class ArrayEditor extends Vue {
  schema!: common.ArraySchema
  initialValue?: common.ValueType[]
  title!: string
  icon!: common.Icon
  locale!: common.Locale
  theme!: common.Theme
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean
  dragula?: common.Dragula
  noSelect2?: boolean
  minItemCountIfNeedFilter?: number

  renderSwitch = 1
  collapsed?: boolean = false
  value?: common.ValueType[] = []
  errorMessage?: string = ''
  buttonGroupStyleString = common.buttonGroupStyleString
  filter = ''
  private invalidIndexes = []
  private drak?: dragula.Drake | null = null

  beforeMount() {
    this.collapsed = this.schema.collapsed
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[]
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  get filteredValues() {
    return this.getValue.map((p, i) => ({ p, i }))
      .filter(({ p, i }) => common.filterArray(p, i, this.schema.items, this.filter))
  }
  private get getValue() {
    if (this.value !== undefined && !this.collapsed) {
      return this.value
    }
    return []
  }
  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get hasAddButton() {
    return !this.isReadOnly && this.value !== undefined && !this.schema.enum
  }
  get titleToShow() {
    return common.getTitle(this.title, this.schema.title)
  }
  get showFilter() {
    const minItemCountIfNeedFilter = typeof this.minItemCountIfNeedFilter === 'number' ? this.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
    return this.getValue.length >= minItemCountIfNeedFilter
  }
  get className() {
    const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
    return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
  }
  get options() {
    return common.getOptions(this.schema)
  }

  beforeDestroy() {
    if (this.drak) {
      this.drak.destroy()
    }
  }
  mounted() {
    if (this.dragula) {
      const container = common.findContainer(this.$el.childNodes)
      if (container) {
        this.drak = this.dragula([container])
        this.drak!.on('drop', (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
          if (this.value) {
            common.switchItem(this.value, el, sibling)
            this.renderSwitch = -this.renderSwitch
            this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
          }
        })
      }
    }
  }

  collapseOrExpand() {
    this.collapsed = !this.collapsed
  }
  toggleOptional() {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  addItem() {
    this.value!.push(common.getDefaultValue(true, this.schema.items, undefined)!)
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  onDeleteFunction(i: number) {
    this.value!.splice(i, 1)
    this.renderSwitch = -this.renderSwitch
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  onChange(i: number, { value, isValid }: common.ValidityValue<common.ValueType>) {
    this.value![i] = value
    this.validate()
    common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i)
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  onFilterChange(e: { target: { value: string } }) {
    this.filter = e.target.value
  }
  isChecked(value: any) {
    return this.value && this.value.indexOf(value) !== -1
  }
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
  }
  onChangeSelect2(value: any) {
    this.value = value
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  private validate() {
    this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale)
  }
}
