import { defineComponent } from 'vue'
import { iconTemplateHtml } from './variables'

export const Icon = defineComponent({
  render: iconTemplateHtml,
  props: ['icon', 'text', 'theme'],
})
