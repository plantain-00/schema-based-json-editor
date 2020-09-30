import { defineComponent, PropType } from 'vue'
import * as common from 'schema-based-json-editor'
import { Select2 } from "select2-vue-component"
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { booleanEditorTemplateHtml } from './variables'

export const BooleanEditor = defineComponent({
  render: booleanEditorTemplateHtml,
  components: {
    icon: Icon,
    optional: Optional,
    description: Description,
    select2: Select2,
  },
  props: {
    schema: {
      type: Object as PropType<common.BooleanSchema>,
      required: true,
    },
    initialValue: Boolean,
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
  },
  data: () => {
    return {
      value: false as boolean | undefined,
      buttonGroupStyle: common.buttonGroupStyleString,
    }
  },
  beforeMount() {
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean
    this.$emit('update-value', { value: this.value, isValid: true })
  },
  computed: {
    isReadOnly(): boolean | undefined {
      return this.readonly || this.schema.readonly
    },
    hasDeleteButtonFunction(): boolean {
      return this.hasDeleteButton && !this.isReadOnly
    },
    titleToShow(): string {
      return common.getTitle(this.title, this.schema.title)
    },
    booleanOptions(): Array<{ value: boolean, label: string }> {
      return [
        {
          value: true,
          label: this.locale.info.true
        },
        {
          value: false,
          label: this.locale.info.false
        }
      ]
    },
    className(): string {
      const rowClass = this.theme.row
      return this.schema.className ? rowClass + ' ' + this.schema.className : rowClass
    },
  },
  methods: {
    onChange() {
      this.value = !this.value
      this.$emit('update-value', { value: this.value, isValid: true })
    },
    toggleOptional() {
      this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined
      this.$emit('update-value', { value: this.value, isValid: true })
    },
  }
})
