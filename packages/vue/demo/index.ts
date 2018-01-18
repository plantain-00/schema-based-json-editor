import Vue from 'vue'
import Component from 'vue-class-component'
import { schema, schemaSchema } from 'schema-based-json-editor/demo/'

// tslint:disable:no-duplicate-imports
import '../dist/'
import { ValidityValue, ValueType } from '../dist/'

import * as dragula from 'dragula'
import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'

@Component({
  template: `
    <div>
        <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/vue/demo" target="_blank">the source code of the demo</a>
        <br/>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
            <json-editor :schema="schemaSchema"
			    :initial-value="formattedSchema"
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
		<div style="width: 500px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
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
		<div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px">
            Value:
			<pre :style="{borderColor: color}"><code v-html="valueHtml"></code></pre>
		</div>
    </div>
    `
})
class App extends Vue {
  locale = null
  schema = schema
  value = {}
  color = 'black'
  dragula = dragula
  markdownit = MarkdownIt
  hljs = hljs
  valueHtml = ''
  schemaSchema = schemaSchema
  get formattedSchema () {
    return JSON.stringify(this.schema, null, '  ')
  }
  beforeCreate () {
    if (navigator.language === 'zh-CN') {
      import('../../core/dist/locales/' + navigator.language + '.js').then(module => {
        this.locale = module.locale
      })
    }
  }
  updateSchema ({ value }: ValidityValue<ValueType>) {
    try {
      this.schema = JSON.parse(value as string)
    } catch (error) {
            // tslint:disable-next-line:no-console
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
