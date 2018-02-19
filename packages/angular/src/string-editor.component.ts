import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { Dragula, MarkdownIt, HLJS } from 'schema-based-json-editor/dist/libs'
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
    dragula?: Dragula
  @Input()
    md?: MarkdownIt
  @Input()
    hljs?: HLJS
  @Input()
    forceHttps?: boolean

  value?: string
  errorMessage!: string
  buttonGroupStyle = common.buttonGroupStyleString
  collapsed = false
  onChange (e: { target: { value: string } }) {
    this.value = e.target.value
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  ngOnInit () {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  get useTextArea () {
    return this.value !== undefined
            && !this.collapsed
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format === 'textarea' || this.schema.format === 'code' || this.schema.format === 'markdown')
  }
  get useInput () {
    return this.value !== undefined
            && !this.collapsed
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format !== 'textarea' && this.schema.format !== 'code' && this.schema.format !== 'markdown')
  }
  get useSelect () {
    return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly
  }
  private get canPreviewImage () {
    return common.isImageUrl(this.value) || common.isBase64Image(this.value)
  }
  private get canPreviewMarkdown () {
    return this.md && this.schema.format === 'markdown'
  }
  private get canPreviewCode () {
    return this.hljs && this.schema.format === 'code'
  }
  get canPreview () {
    return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode)
  }
  get getImageUrl () {
    return this.forceHttps ? common.replaceProtocal(this.value!) : this.value
  }
  get getMarkdown () {
    return this.md!.render(this.value!)
  }
  get getCode () {
    return this.hljs!.highlightAuto(this.value!).value
  }
  get isReadOnly () {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction () {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get willPreviewImage () {
    return this.value && !this.collapsed && this.canPreviewImage
  }
  get willPreviewMarkdown () {
    return this.value && !this.collapsed && this.canPreviewMarkdown
  }
  get willPreviewCode () {
    return this.value && !this.collapsed && this.canPreviewCode
  }
  get titleToShow () {
    return common.getTitle(this.title, this.schema.title)
  }
  get options () {
    return this.schema.enum!.map(e => ({
      value: e,
      label: e
    }))
  }
  get canUpload () {
    return this.schema.format === 'base64'
  }

  updateSelection (value: string) {
    this.value = value
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }

  toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
  }
  collapseOrExpand = () => {
    this.collapsed = !this.collapsed
  }
  fileGot (file: File | Blob) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.value = reader.result
      this.validate()
      this.updateValue.emit({ value: this.value, isValid: !this.errorMessage })
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }

  private validate () {
    this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale)
  }
}
