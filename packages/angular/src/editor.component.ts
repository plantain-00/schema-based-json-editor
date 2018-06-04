import { Component, Input, Output, EventEmitter } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { editorTemplateHtml } from './variables'

@Component({
  selector: 'editor',
  template: editorTemplateHtml
})
export class EditorComponent {
  @Input()
  schema!: common.Schema
  @Input()
  initialValue!: common.ValueType[]
  @Input()
  title?: string
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<common.ValueType>>()
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
}
