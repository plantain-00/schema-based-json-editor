import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { stringEditorTemplateHtml, stringEditorTemplateHtmlStatic } from './variables'
import 'markdown-tip-vue'
import 'select2-vue-component'
import 'file-uploader-vue-component'

@Component({
  render: stringEditorTemplateHtml,
  staticRenderFns: stringEditorTemplateHtmlStatic,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description
  },
  props: ['schema', 'initialValue', 'title', 'theme', 'icon', 'locale', 'readonly', 'required', 'hasDeleteButton', 'dragula', 'md', 'hljs', 'forceHttps', 'noSelect2', 'monacoEditor']
})
export class StringEditor extends Vue {
  schema!: common.StringSchema
  initialValue?: string
  title!: string
  theme!: common.Theme
  icon!: common.Icon
  locale!: common.Locale
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean
  md?: any
  hljs?: common.HLJS
  forceHttps?: boolean
  noSelect2?: boolean
  monacoEditor?: common.MonacoEditor

  value? = ''
  errorMessage? = ''
  buttonGroupStyle = common.buttonGroupStyleString
  collapsed = false
  imagePreviewStyle = common.imagePreviewStyleString
  private monacoCodeEditor?: common.IStandaloneCodeEditor

  onChange(e: { target: { value: string } }) {
    this.value = e.target.value
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  mounted() {
    if (this.monacoEditor && this.$refs.monacoEditor) {
      this.monacoCodeEditor = this.monacoEditor.create(this.$refs.monacoEditor as HTMLDivElement, {
        value: this.value,
        language: 'json',
        minimap: { enabled: false },
        lineNumbers: 'off'
      })
      let timer: NodeJS.Timer
      this.monacoCodeEditor.onDidChangeModelContent(() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.value = this.monacoCodeEditor!.getValue()
          this.validate()
          this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
        }, 500)
      })
    }
  }

  beforeDestroy() {
    if (this.monacoCodeEditor) {
      this.monacoCodeEditor.dispose()
    }
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
  private get useSelect() {
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
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }

  toggleOptional() {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  }
  collapseOrExpand() {
    this.collapsed = !this.collapsed
  }
  fileGot(file: File | Blob) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.value = reader.result as string
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }
  private validate() {
    this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale)
  }
}
