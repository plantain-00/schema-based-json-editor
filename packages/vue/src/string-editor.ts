import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { Select2 } from "select2-vue-component"
import { FileUploader } from "file-uploader-vue-component"
import { MarkdownTip } from "markdown-tip-vue"
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { stringEditorTemplateHtml } from './variables'

export const StringEditor = defineComponent({
  render: stringEditorTemplateHtml,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
    select2: Select2,
    'file-uploader': FileUploader,
    'markdown-tip': MarkdownTip,
  },
  props: {
    schema: {
      type: Object as PropType<common.StringSchema>,
      required: true,
    },
    initialValue: String,
    title: [String, Number],
    theme: {
      type: Object as PropType<common.Theme>,
      required: true,
    },
    icon: {
      type: Object as PropType<common.Icon>,
      requried: true,
    },
    locale: {
      type: Object as PropType<common.Locale>,
      required: true,
    },
    readonly: Boolean,
    required: Boolean,
    hasDeleteButton: {
      type: Boolean,
      required: true,
    },
    noSelect2: {
      type: Boolean,
      required: true,
    },
    md: Object,
    hljs: Object,
    forceHttps: Boolean,
    monacoEditor: Object as PropType<common.MonacoEditor>,
  },
  data: () => {
    return {
      value: '' as string | undefined,
      errorMessage: '' as string | undefined,
      buttonGroupStyle: common.buttonGroupStyleString,
      collapsed: false,
      imagePreviewStyle: common.imagePreviewStyleString,
      monacoCodeEditor: undefined as common.IStandaloneCodeEditor | undefined,
    }
  },
  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string
    this.validate()
    this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
  },
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
  },
  beforeUnmount() {
    if (this.monacoCodeEditor) {
      this.monacoCodeEditor.dispose()
    }
  },
  methods: {
    onChange(e: { target: { value: string } }) {
      this.value = e.target.value
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    },
    updateSelection(value: string) {
      this.value = value
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    },
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined
      this.validate()
      this.$emit('update-value', { value: this.value, isValid: !this.errorMessage })
    },
    collapseOrExpand() {
      this.collapsed = !this.collapsed
    },
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
    },
    validate() {
      this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale)
    },
  },
  computed: {
    canPreviewImage(): boolean {
      return common.isImageUrl(this.value) || common.isBase64Image(this.value)
    },
    canPreviewMarkdown(): boolean | undefined {
      return this.md && this.schema.format === 'markdown'
    },
    canPreviewCode(): boolean | undefined {
      return this.hljs && this.schema.format === 'code'
    },
    canPreview(): boolean | undefined {
      return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode)
    },
    useTextArea(): boolean | undefined {
      return this.value !== undefined
        && (this.schema.enum === undefined || this.isReadOnly)
        && (this.schema.format === 'textarea' || this.schema.format === 'code' || this.schema.format === 'json' || this.schema.format === 'markdown')
    },
    useInput(): boolean | undefined {
      return this.value !== undefined
        && !this.collapsed
        && (this.schema.enum === undefined || this.isReadOnly)
        && (this.schema.format !== 'textarea' && this.schema.format !== 'code' && this.schema.format !== 'json' && this.schema.format !== 'markdown')
    },
    useSelect(): boolean {
      return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly
    },
    useSelect2Component(): boolean {
      return this.useSelect && !this.noSelect2 && this.schema.format !== 'select' && this.schema.format !== 'radiobox'
    },
    useSelectComponent(): boolean {
      return this.useSelect && (this.schema.format === 'select' || this.noSelect2)
    },
    useRadioBoxComponent(): boolean {
      return this.useSelect && this.schema.format === 'radiobox'
    },
    getImageUrl(): string | undefined {
      return this.forceHttps ? common.replaceProtocal(this.value!) : this.value
    },
    getMarkdown(): string {
      return this.md!.render(this.value!)
    },
    getCode(): string {
      return this.hljs!.highlightAuto(this.value!).value
    },
    isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
    hasDeleteButtonFunction(): boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
    willPreviewImage(): boolean | '' | undefined {
      return this.value && !this.collapsed && this.canPreviewImage
    },
    willPreviewMarkdown(): boolean | '' | undefined {
      return this.value && !this.collapsed && this.canPreviewMarkdown
    },
    willPreviewCode(): boolean | '' | undefined {
      return this.value && !this.collapsed && this.canPreviewCode
    },
    titleToShow(): string {
      return common.getTitle(this.title, this.schema.title)
    },
    options(): {
      value: string | number;
      label: string | number;
    }[] {
      return common.getOptions(this.schema)
    },
    canUpload(): boolean {
      return this.schema.format === 'base64'
    },
    className(): string {
      const rowClass = this.errorMessage ? this.theme.errorRow : this.theme.row
      return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
    },
  },
})
