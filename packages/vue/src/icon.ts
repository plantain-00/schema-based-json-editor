import Vue from 'vue'
import Component from 'vue-class-component'
import { iconTemplateHtml, iconTemplateHtmlStatic } from './variables'

@Component({
  render: iconTemplateHtml,
  staticRenderFns: iconTemplateHtmlStatic,
  props: ['icon', 'text', 'theme']
})
export class Icon extends Vue {

}
