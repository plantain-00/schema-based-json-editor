import { Component, Input, Output, EventEmitter } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { nullEditorTemplateHtml } from './variables'

@Component({
  selector: 'null-editor',
  template: nullEditorTemplateHtml
})
export class NullEditorComponent {
  @Input()
  schema!: common.NullSchema
  @Input()
  initialValue!: null
  @Input()
  title?: string
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<null | undefined>>()
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

  value?: null
  buttonGroupStyle = common.buttonGroupStyleString
  ngOnInit() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null
    this.updateValue.emit({ value: this.value, isValid: true })
  }
  toggleOptional() {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined
    this.updateValue.emit({ value: this.value, isValid: true })
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
}
