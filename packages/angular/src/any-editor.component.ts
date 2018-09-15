import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core'
import * as common from 'schema-based-json-editor'
const JSON5 = require('json5/dist')
import { anyEditorTemplateHtml } from './variables'

@Component({
  selector: 'any-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: anyEditorTemplateHtml
})
export class AnyEditorComponent {
  @Input()
  schema!: common.StringSchema
  @Input()
  initialValue!: string
  @Input()
  title?: string
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<string | undefined>>()
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
  monacoEditor?: common.MonacoEditor

  @ViewChild('monacoEditorRef')
  private monacoEditorRef!: ElementRef

  value?: string
  buttonGroupStyle = common.buttonGroupStyleString
  private monacoCodeEditor?: common.IStandaloneCodeEditor
  ngOnInit() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string
    this.updateValue.emit({ value: this.value, isValid: true })
  }
  ngAfterViewInit() {
    if (this.monacoEditor && this.monacoEditorRef && this.monacoEditorRef.nativeElement) {
      this.monacoCodeEditor = this.monacoEditor.create(this.monacoEditorRef.nativeElement as HTMLDivElement, {
        value: 'export default ' + JSON5.stringify(this.value, null, 2),
        language: 'javascript',
        minimap: { enabled: false },
        lineNumbers: 'off'
      })
      let timer: NodeJS.Timer
      this.monacoCodeEditor.onDidChangeModelContent((e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          try {
            let value = this.monacoCodeEditor!.getValue()
            if (value.indexOf('export default') === 0) {
              value = value.substring('export default'.length)
            }
            this.value = JSON5.parse(value)
            this.updateValue.emit({ value: this.value, isValid: true })
          } catch (error) {
            // do nothing
          }
        }, 500)
      })
    }
  }
  ngOnDestroy() {
    if (this.monacoCodeEditor) {
      this.monacoCodeEditor.dispose()
    }
  }
  get titleToShow() {
    return common.getTitle(this.title, this.schema.title)
  }
  get className() {
    return this.schema.className ? this.theme.row + ' ' + this.schema.className : this.theme.row
  }
  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }

  toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined
    this.updateValue.emit({ value: this.value, isValid: true })
  }
}
