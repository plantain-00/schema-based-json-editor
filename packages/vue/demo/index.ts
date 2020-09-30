import { createApp, defineComponent } from 'vue'
import { schema, initialValue, propertiesSchema, propertiesInitialValue, theme, icon, addAllCssLinks } from 'schema-based-json-editor/demo/'

import { ArrayEditor, JSONEditor, ObjectEditor, ValidityValue, ValueType } from  '../dist/'

import dragula from 'dragula'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import * as monaco from 'monaco-editor'

addAllCssLinks('../../core/demo/css/')

const App = defineComponent({
  data: () => {
    return {
      locale: null,
      schema,
      initialValue,
      color: 'black',
      dragula,
      markdownit: MarkdownIt,
      hljs,
      monacoEditor: monaco.editor,
      valueHtml: '',
      propertiesSchema,
      propertiesInitialValue,
      theme,
      icon,
    }
  },
  beforeCreate() {
    if (navigator.language === 'zh-CN') {
      import('../../core/dist/locales/' + navigator.language + '.js').then(module => {
        this.locale = module.locale
      })
    }
  },
  methods: {
    updatePropertiesValue({ value }: ValidityValue<ValueType>) {
      try {
        localStorage.setItem('json-editor:properties', JSON.stringify(value))
      } catch (error: unknown) {
        console.log(error)
      }
    },
    updateValue({ value, isValid }: ValidityValue<ValueType>) {
      this.valueHtml = hljs.highlight('json', JSON.stringify(value, null, '  ')).value
      this.color = isValid ? 'black' : 'red'
    },
  },
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
          :hljs="hljs"
          :monaco-editor="monacoEditor">
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
          :hljs="hljs"
          :monaco-editor="monacoEditor">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; position: fixed; right: 10px; height: 100%; overflow-y: scroll">
        Value:
        <pre :style="{borderColor: color}"><code v-html="valueHtml"></code></pre>
      </div>
    </div>
    `
})

const app = createApp(App)
app.component('array-editor', ArrayEditor)
app.component('object-editor', ObjectEditor)
app.component('json-editor', JSONEditor)
app.mount('#container')
