import Vue from 'vue'
import Component from 'vue-class-component'
import { schema, initialValue, propertiesSchema, propertiesInitialValue, theme, icon, addAllCssLinks } from 'schema-based-json-editor/demo/'

// tslint:disable:no-duplicate-imports
import '../dist/'
import { ValidityValue, ValueType } from '../dist/'

import * as dragula from 'dragula'
import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'

addAllCssLinks('../../core/demo/css/')

@Component({
  template: `
    <div style="position: relative">
      <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/vue/demo" target="_blank">the source code of the demo</a>
      <br/>
      <div style="width: 30%; margin: 10px; position: fixed; height: 100%; overflow-y: scroll" class="bootstrap3-row-container">
        <json-editor :schema="propertiesSchema"
          :initial-value="propertiesInitialValue"
          @update-value="updatePropertiesValue($event)"
          :theme="theme"
          :icon="icon"
          :locale="locale"
          :dragula="dragula"
          :markdownit="markdownit"
          :hljs="hljs">
        </json-editor>
      </div>
      <div style="width: 35%; margin: 10px; position: absolute; left: 31%;" class="bootstrap3-row-container">
        <json-editor :schema="schema"
          :initial-value="initialValue"
          @update-value="updateValue($event)"
          :theme="theme"
          :icon="icon"
          :locale="locale"
          :dragula="dragula"
          :markdownit="markdownit"
          :hljs="hljs">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; position: fixed; right: 10px; height: 100%; overflow-y: scroll">
        Value:
        <pre :style="{borderColor: color}"><code v-html="valueHtml"></code></pre>
      </div>
    </div>
    `
})
class App extends Vue {
  locale = null
  schema = schema
  initialValue = initialValue
  color = 'black'
  dragula = dragula
  markdownit = MarkdownIt
  hljs = hljs
  valueHtml = ''
  propertiesSchema = propertiesSchema
  propertiesInitialValue = propertiesInitialValue
  theme = theme
  icon = icon
  beforeCreate () {
    if (navigator.language === 'zh-CN') {
      import('../../core/dist/locales/' + navigator.language + '.js').then(module => {
        this.locale = module.locale
      })
    }
  }
  updatePropertiesValue ({ value }: ValidityValue<ValueType>) {
    try {
      localStorage.setItem('json-editor:properties', JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }
  updateValue ({ value, isValid }: ValidityValue<ValueType>) {
    this.valueHtml = hljs.highlight('json', JSON.stringify(value, null, '  ')).value
    this.color = isValid ? 'black' : 'red'
  }
}

// tslint:disable-next-line:no-unused-expression
new App({ el: '#container' })
