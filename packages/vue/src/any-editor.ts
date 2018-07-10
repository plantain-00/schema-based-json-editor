import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'schema-based-json-editor'
import JSON5 from 'json5'
import { Icon } from './icon'
import { Editor } from './editor'
import { Optional } from './optional'
import { Description } from './description'
import { anyEditorTemplateHtml, anyEditorTemplateHtmlStatic } from './variables'

@Component({
  render: anyEditorTemplateHtml,
  staticRenderFns: anyEditorTemplateHtmlStatic,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
    editor: Editor
  },
  props: [
    'schema',
    'initialValue',
    'title',
    'theme',
    'icon',
    'locale',
    'readonly',
    'required',
    'monacoEditor'
  ]
})
export class AnyEditor extends Vue {
  schema!: common.StringSchema
  initialValue: string | undefined
  title!: string
  theme!: common.Theme
  icon!: common.Icon
  locale!: common.Locale
  readonly!: boolean
  required!: boolean
  hasDeleteButton!: boolean
  monacoEditor?: common.MonacoEditor

  value?: common.ValueType
  private monacoCodeEditor: common.IStandaloneCodeEditor | undefined

  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue)
  }

  mounted() {
    if (this.monacoEditor && this.$refs.monacoEditor) {
      this.monacoCodeEditor = this.monacoEditor.create(this.$refs.monacoEditor as HTMLDivElement, {
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
            // tslint:disable-next-line:no-duplicate-string
            this.$emit('update-value', { value: this.value, isValid: true })
          } catch (error) {
            // do nothing
          }
        }, 500)
      })
    }
  }

  get className() {
    const rowClass = this.theme.row
    return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
  }

  get titleToShow() {
    return common.getTitle(this.title, this.schema.title)
  }

  get isReadOnly() {
    return this.readonly || this.schema.readonly
  }

  get hasDeleteButtonFunction() {
    return this.hasDeleteButton && !this.isReadOnly
  }

  toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as any
    this.$emit('update-value', { value: this.value, isValid: true })
  }
}
