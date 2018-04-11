import { Component, Input, Output, EventEmitter } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { booleanEditorTemplateHtml } from './variables'

@Component({
  selector: 'boolean-editor',
  template: booleanEditorTemplateHtml
})
export class BooleanEditorComponent {
  @Input()
  schema!: common.BooleanSchema
  @Input()
  initialValue!: boolean
  @Input()
  title?: string
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<boolean | undefined>>()
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

  value?: boolean
  buttonGroupStyle = common.buttonGroupStyleString
  ngOnInit () {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean
    this.updateValue.emit({ value: this.value, isValid: true })
  }
  onChange (e: { target: { checked: boolean } }) {
    this.value = !this.value
    this.updateValue.emit({ value: this.value, isValid: true })
  }
  toggleOptional () {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined
    this.updateValue.emit({ value: this.value, isValid: true })
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
}
