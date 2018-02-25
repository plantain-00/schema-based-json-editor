import Vue from 'vue'
import Component from 'vue-class-component'
import { schema, schemaSchema, initialValue, initialValueSchema } from 'schema-based-json-editor/demo/'

// tslint:disable:no-duplicate-imports
import '../dist/'
import { ValidityValue, ValueType } from '../dist/'

import * as dragula from 'dragula'
import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'

@Component({
  template: `
    <div style="position: relative">
      <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/vue/demo" target="_blank">the source code of the demo</a>
      <br/>
      <div style="width: 30%; margin: 10px; overflow-y: scroll; position: absolute;" class="bootstrap3-row-container">
        <json-editor :schema="schemaSchema"
          :initial-value="editingSchema"
          @update-value="updateSchema($event)"
          theme="bootstrap3"
          icon="fontawesome4"
          :locale="locale"
          :dragula="dragula"
          :markdownit="markdownit"
          :hljs="hljs"
          :force-https="false">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; overflow-y: scroll; position: absolute; top: 300px;" class="bootstrap3-row-container">
        <json-editor :schema="initialValueSchema"
          :initial-value="editingInitialValue"
          @update-value="updateInitialValue($event)"
          theme="bootstrap3"
          icon="fontawesome4"
          :locale="locale"
          :dragula="dragula"
          :markdownit="markdownit"
          :hljs="hljs"
          :force-https="false">
        </json-editor>
      </div>
      <div style="width: 35%; margin: 10px; overflow-y: scroll; position: absolute; left: 31%;" class="bootstrap3-row-container">
        <json-editor :schema="schema"
          :initial-value="value"
          @update-value="updateValue($event)"
          theme="bootstrap3"
          icon="fontawesome4"
          :locale="locale"
          :dragula="dragula"
          :markdownit="markdownit"
          :hljs="hljs"
          :force-https="false">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; overflow-y: scroll; position: absolute; right: 10px;">
        Value:
        <pre :style="{borderColor: color}"><code v-html="valueHtml"></code></pre>
      </div>
    </div>
    `
})
class App extends Vue {
  locale = null
  schema = schema
  value = initialValue
  color = 'black'
  dragula = dragula
  markdownit = MarkdownIt
  hljs = hljs
  valueHtml = ''
  schemaSchema = schemaSchema
  initialValueSchema = initialValueSchema
  editingSchema = JSON.stringify(schema, null, '  ')
  editingInitialValue = JSON.stringify(initialValue, null, '  ')
  beforeCreate () {
    if (navigator.language === 'zh-CN') {
      import('../../core/dist/locales/' + navigator.language + '.js').then(module => {
        this.locale = module.locale
      })
    }
  }
  updateSchema ({ value }: ValidityValue<ValueType>) {
    try {
      this.editingSchema = value as string
      localStorage.setItem('json-editor:schema', this.editingSchema)
    } catch (error) {
      console.log(error)
    }
  }
  updateInitialValue ({ value }: ValidityValue<ValueType>) {
    try {
      this.editingInitialValue = value as string
      localStorage.setItem('json-editor:initial-value', this.editingInitialValue)
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
