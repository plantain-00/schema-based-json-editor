import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { nullEditorTemplateHtml } from './variables'

export const NullEditor = defineComponent({
  render: nullEditorTemplateHtml,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description
  },
  props: {
    schema: {
      type: Object as PropType<common.NullSchema>,
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
  },
  data: () => {
    return {
      value: null as null | undefined,
      buttonGroupStyle: common.buttonGroupStyleString,
    }
  },
  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null
    this.$emit('update-value', { value: this.value, isValid: true })
  },
  computed: {
     isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
     hasDeleteButtonFunction():boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
     titleToShow():string {
      return common.getTitle(this.title, this.schema.title)
    },
  },
  methods: {
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined
      this.$emit('update-value', { value: this.value, isValid: true })
    }
  }
})
