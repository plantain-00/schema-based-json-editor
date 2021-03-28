import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { editorTemplateHtml } from './variables'
import { Schema } from '.'
import { BooleanEditor } from './boolean-editor'
import { NullEditor } from './null-editor'
import { NumberEditor } from './number-editor'
import { StringEditor } from './string-editor'
import { AnyEditor } from './any-editor'

export const Editor = defineComponent({
  components: {
    'boolean-editor': BooleanEditor,
    'null-editor': NullEditor,
    'number-editor': NumberEditor,
    'string-editor': StringEditor,
    'any-editor': AnyEditor,
  },
  render: editorTemplateHtml,
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    initialValue: null,
    title: [String, Number],
    getReference: {
      type: Function as unknown as PropType<(ref: string) => Schema | undefined>,
      required: true,
    },
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
    dragula: Function as unknown as PropType<common.Dragula | undefined>,
    md: Object,
    hljs: Object,
    forceHttps: Boolean,
    disableCollapse: Boolean,
    noSelect2: Boolean,
    minItemCountIfNeedFilter: Number,
    monacoEditor: Object as PropType<common.MonacoEditor>,
  },
  computed: {
     realSchema(): Schema {
      if (this.schema.$ref) {
        const reference = this.getReference(this.schema.$ref)
        if (reference) {
          return reference
        }
      }
      return this.schema
    }
  }
})
