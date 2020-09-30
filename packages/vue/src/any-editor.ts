import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import JSON5 from 'json5'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { anyEditorTemplateHtml } from './variables'

export const AnyEditor = defineComponent({
  props: {
    schema: {
      type: Object as PropType<common.StringSchema>,
      required: true,
    },
    initialValue: null,
    title: [String, Number],
    theme: {
      type: Object as PropType<common.Theme>,
      required: true,
    },
    icon: {
      type: Object as PropType<common.Icon>,
      required: true,
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
    monacoEditor: Object as PropType<common.MonacoEditor>,
  },
  data: () => {
    return {
      value: undefined as common.ValueType | undefined,
      monacoCodeEditor: undefined as common.IStandaloneCodeEditor | undefined,
      buttonGroupStyle: common.buttonGroupStyleString,
    }
  },
  computed: {
    className(): string {
      const rowClass = this.theme.row
      return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
    },
    titleToShow(): string {
      return common.getTitle(this.title, this.schema.title)
    },
    isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
    hasDeleteButtonFunction(): boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
  },
  methods: {
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as any
      this.$emit('update-value', { value: this.value, isValid: true })
    }
  },
  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue)
  },
  mounted() {
    if (this.monacoEditor && this.$refs.monacoEditor) {
      this.monacoCodeEditor = this.monacoEditor.create(this.$refs.monacoEditor as HTMLDivElement, {
        value: 'export default ' + JSON5.stringify(this.value, null, 2),
        language: 'javascript',
        minimap: { enabled: false },
        lineNumbers: 'off'
      })
      let timer: NodeJS.Timer
      this.monacoCodeEditor.onDidChangeModelContent(() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          try {
            let value = this.monacoCodeEditor!.getValue()
            if (value.indexOf('export default') === 0) {
              value = value.substring('export default'.length)
            }
            this.value = JSON5.parse(value)
            this.$emit('update-value', { value: this.value, isValid: true })
          } catch {
            // do nothing
          }
        }, 500)
      })
    }
  },
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
  },
  render: anyEditorTemplateHtml,
})
