import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { stringEditorTemplateHtml } from './variables'

@Component({
  selector: 'string-editor',
  styles: [
    `.schema-based-json-editor-image-preview {${common.imagePreviewStyleString}}`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: stringEditorTemplateHtml
})
export class StringEditorComponent {
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
  dragula?: common.Dragula
  @Input()
  md?: any
  @Input()
  hljs?: common.HLJS
  @Input()
  forceHttps?: boolean
  @Input()
  noSelect2?: boolean
  @Input()
  monacoEditor?: common.MonacoEditor

  @ViewChild('monacoEditorRef', { static: false })
  private monacoEditorRef!: ElementRef

  value?: string
  errorMessage!: string
  buttonGroupStyle = common.buttonGroupStyleString
  collapsed = false
  private monacoCodeEditor?: common.IStandaloneCodeEditor
  onChange(e: { target: { value: string } }) {
    this.value = e.target.value
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  ngOnInit() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  ngAfterViewInit() {
    if (this.monacoEditor && this.monacoEditorRef && this.monacoEditorRef.nativeElement) {
      this.monacoCodeEditor = this.monacoEditor.create(this.monacoEditorRef.nativeElement, {
        value: this.value,
        language: 'json',
        minimap: { enabled: false },
        lineNumbers: 'off'
      })
      let timer: NodeJS.Timer
      this.monacoCodeEditor.onDidChangeModelContent((e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.value = this.monacoCodeEditor!.getValue()
          this.validate()
          this.validate()
          this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
        }, 500)
      })
    }
  }
  ngOnDestroy() {
    if (this.monacoCodeEditor) {
      this.monacoCodeEditor.dispose()
    }
  }
  get useTextArea() {
    return this.value !== undefined
      && (this.schema.enum === undefined || this.isReadOnly)
      && (this.schema.format === 'textarea' || this.schema.format === 'code' || this.schema.format === 'json' || this.schema.format === 'markdown')
  }
  get useInput() {
    return this.value !== undefined
      && !this.collapsed
      && (this.schema.enum === undefined || this.isReadOnly)
      && (this.schema.format !== 'textarea' && this.schema.format !== 'code' && this.schema.format !== 'json' && this.schema.format !== 'markdown')
  }
  get useSelect() {
    return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly
  }
  get useSelect2Component() {
    return this.useSelect && !this.noSelect2 && this.schema.format !== 'select' && this.schema.format !== 'radiobox'
  }
  get useSelectComponent() {
    return this.useSelect && (this.schema.format === 'select' || this.noSelect2)
  }
  get useRadioBoxComponent() {
    return this.useSelect && this.schema.format === 'radiobox'
  }
  private get canPreviewImage() {
    return common.isImageUrl(this.value) || common.isBase64Image(this.value)
  }
  private get canPreviewMarkdown() {
    return this.md && this.schema.format === 'markdown'
  }
  private get canPreviewCode() {
    return this.hljs && this.schema.format === 'code'
  }
  get canPreview() {
    return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode)
  }
  get getImageUrl() {
    return this.forceHttps ? common.replaceProtocal(this.value!) : this.value
  }
  get getMarkdown() {
    return this.md!.render(this.value!)
  }
  get getCode() {
    return this.hljs!.highlightAuto(this.value!).value
  }
  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get willPreviewImage() {
    return this.value && !this.collapsed && this.canPreviewImage
  }
  get willPreviewMarkdown() {
    return this.value && !this.collapsed && this.canPreviewMarkdown
  }
  get willPreviewCode() {
    return this.value && !this.collapsed && this.canPreviewCode
  }
  get titleToShow() {
    return common.getTitle(this.title, this.schema.title)
  }
  get options() {
    return common.getOptions(this.schema)
  }
  get canUpload() {
    return this.schema.format === 'base64'
  }
  get className() {
    const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
    return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
  }

  updateSelection(value: string) {
    this.value = value
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  trackByFunction = (index: number) => {
    return index
  }
  toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  collapseOrExpand = () => {
    this.collapsed = !this.collapsed
  }
  fileGot(file: File | Blob) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.value = reader.result as string
      this.validate()
      this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }

  private validate() {
    this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale)
  }
}
