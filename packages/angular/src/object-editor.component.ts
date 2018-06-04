import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { objectEditorTemplateHtml } from './variables'

@Component({
  selector: 'object-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: objectEditorTemplateHtml
})
export class ObjectEditorComponent {
  @Input()
  schema!: common.ObjectSchema
  @Input()
  initialValue!: { [name: string]: common.ValueType }
  @Input()
  title?: string
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<{ [name: string]: common.ValueType } | undefined>>()
  @Input()
  theme!: common.Theme
  @Input()
  icon!: common.Icon
  @Input()
  locale!: common.Locale
  @Output()
  onDelete = new EventEmitter()
  @Input()
  readonly?: boolean
  @Input()
  required?: boolean
  @Input()
  hasDeleteButton!: boolean
  @Input()
  dragula?: common.Dragula
  @Input()
  md?: common.MarkdownIt
  @Input()
  hljs?: common.HLJS
  @Input()
  forceHttps?: boolean
  @Input()
  disableCollapse?: boolean
  @Input()
  noSelect2?: boolean
  @Input()
  minItemCountIfNeedFilter?: number

  collapsed?: boolean = false
  value?: { [name: string]: common.ValueType }
  buttonGroupStyle = common.buttonGroupStyleString
  errorMessage!: string
  filter = ''
  private properties: { property: string; schema: common.Schema }[] = []
  private invalidProperties: string[] = []
  ngOnInit() {
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
    this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 })
  }
  isRequired(property: string) {
    return common.isRequired(this.schema.required, this.value, this.schema, property)
  }
  trackByFunction = (index: number, p: { property: string; schema: common.Schema }) => {
    return p.property + this.isRequired(p.property)
  }
  collapseOrExpand = () => {
    this.collapsed = !this.collapsed
  }
  toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 })
  }
  onChange(property: string, { value, isValid }: common.ValidityValue<{ [name: string]: common.ValueType }>) {
    this.value![property] = value
    for (const p in this.schema.properties) {
      if (this.isRequired(p) === false) {
        this.value![p] = undefined
      }
    }
    this.validate()
    common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property)
    this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 })
  }
  onFilterChange(e: { target: { value: string } }) {
    this.filter = e.target.value
  }
  private validate() {
    this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale)
  }
  get filteredProperties() {
    return this.properties.filter(p => common.filterObject(p, this.filter) && this.isRequired(p.property) !== false)
  }
  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }
  get titleToShow() {
    if (this.hasDeleteButton) {
      return common.getTitle(common.findTitle(this.value, this.properties), this.title, this.schema.title)
    }
    return common.getTitle(this.title, this.schema.title)
  }
  get showFilter() {
    const propertycount = this.properties.filter(p => this.isRequired(p.property) !== false).length
    const minItemCountIfNeedFilter = typeof this.minItemCountIfNeedFilter === 'number' ? this.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
    return propertycount >= minItemCountIfNeedFilter
  }
  get className() {
    const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
    return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
  }
}
