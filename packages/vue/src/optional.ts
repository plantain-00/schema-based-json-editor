import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { optionalTemplateHtml } from './variables'

export const Optional = defineComponent({
  render: optionalTemplateHtml,
  props: {
    required: Boolean,
    value: null,
    isReadOnly: Boolean,
    theme: {
      type: Object as PropType<common.Theme>,
      required: true,
    },
    locale: {
      type: Object as PropType<common.Locale>,
      required: true,
    },
  },
  computed: {
    hasOptionalCheckbox(): boolean {
      return !this.required && (this.value === undefined || !this.isReadOnly)
    },
  }
})
