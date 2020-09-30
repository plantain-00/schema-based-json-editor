import { defineComponent } from 'vue'

import { descriptionTemplateHtml } from './variables'

export const Description = defineComponent({
  render: descriptionTemplateHtml,
  props: ['theme', 'message'],
})
