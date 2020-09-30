import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
export * from 'schema-based-json-editor'

import { Editor } from './editor'

export { ArrayEditor } from './array-editor'
export { ObjectEditor } from './object-editor'

import { indexTemplateHtml } from './variables'

/**
 * @public
 */
export const JSONEditor = defineComponent({
  render: indexTemplateHtml,
  components: {
    editor: Editor
  },
  props: {
    schema: {
      type: Object as PropType<common.Schema>,
      required: true,
    },
    initialValue: null,
    theme: String,
    icon: String,
    locale: Object as PropType<common.Locale>,
    readonly: Boolean,
    dragula: Function as PropType<common.Dragula | undefined>,
    markdownit: Function,
    hljs: Object as PropType<common.HLJS>,
    forceHttps: Boolean,
    disableCollapse: Boolean,
    noSelect2: Boolean,
    minItemCountIfNeedFilter: Number,
    monacoEditor: Object as PropType<common.MonacoEditor>,
  },
  computed: {
    themeObject(): common.Theme {
      return common.getTheme(this.theme)
    },
    localeObject(): common.Locale {
      return common.getLocale(this.locale)
    },
    iconObject(): common.Icon {
      return common.getIcon(this.icon, this.localeObject)
    },
    md(): any {
      return common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps)
    },
  },
  methods: {
    getReference (name: string)  {
      if (this.schema.definitions) {
        return this.schema.definitions[name.substring('#/definitions/'.length)]
      }
      return undefined
    },
    updateValue(value: common.ValueType) {
      this.$emit('update-value', value)
    },
  },
})
