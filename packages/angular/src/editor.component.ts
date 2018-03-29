import { Component, Input, Output, EventEmitter } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { Dragula, MarkdownIt, HLJS } from 'schema-based-json-editor/dist/libs'
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
  dragula?: Dragula
  @Input()
  md?: MarkdownIt
  @Input()
  hljs?: HLJS
  @Input()
  forceHttps?: boolean
  @Input()
  disableCollapse?: boolean
}
