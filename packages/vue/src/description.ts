import Vue from 'vue'
import Component from 'vue-class-component'

import { descriptionTemplateHtml, descriptionTemplateHtmlStatic } from './variables'

@Component({
  render: descriptionTemplateHtml,
  staticRenderFns: descriptionTemplateHtmlStatic,
  props: ['theme', 'message']
})
export class Description extends Vue {

}
