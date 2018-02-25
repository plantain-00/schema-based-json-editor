import { Component, ChangeDetectionStrategy } from '@angular/core'

import { ValidityValue, ValueType } from '../dist/'
import { schema, schemaSchema, initialValue, initialValueSchema } from 'schema-based-json-editor/demo/'

import * as dragula from 'dragula'
import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'

@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="position: relative">
      <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/angular/demo" target="_blank">the source code of the demo</a>
      <br/>
      <div style="width: 30%; margin: 10px; overflow-y: scroll; position: absolute;" class="bootstrap3-row-container">
        <json-editor [schema]="schemaSchema"
          [initialValue]="editingSchema"
          (updateValue)="updateSchema($event)"
          theme="bootstrap3"
          icon="fontawesome4"
          [locale]="locale"
          [dragula]="dragula"
          [markdownit]="markdownit"
          [hljs]="hljs"
          [forceHttps]="false">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; overflow-y: scroll; position: absolute; top: 300px;" class="bootstrap3-row-container">
        <json-editor [schema]="initialValueSchema"
          [initialValue]="editingInitialValue"
          (updateValue)="updateInitialValue($event)"
          theme="bootstrap3"
          icon="fontawesome4"
          [locale]="locale"
          [dragula]="dragula"
          [markdownit]="markdownit"
          [hljs]="hljs"
          [forceHttps]="false">
        </json-editor>
      </div>
      <div style="width: 35%; margin: 10px; overflow-y: scroll; position: absolute; left: 31%" class="bootstrap3-row-container">
        <json-editor [schema]="schema"
          [initialValue]="value"
          (updateValue)="updateValue($event)"
          theme="bootstrap3"
          icon="fontawesome4"
          [locale]="locale"
          [dragula]="dragula"
          [markdownit]="markdownit"
          [hljs]="hljs"
          [forceHttps]="false">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; overflow-y: scroll; position: absolute; right: 10px;">
        Value:
        <pre [style.borderColor]="color"><code [innerHTML]="valueHtml"></code></pre>
      </div>
    </div>
    `
})
export class MainComponent {
  locale = null
  schema = schema
  value: any = initialValue
  color = 'black'
  dragula = dragula
  markdownit = MarkdownIt as any
  hljs = hljs
  schemaSchema = schemaSchema
  initialValueSchema = initialValueSchema
  editingSchema = JSON.stringify(schema, null, '  ')
  editingInitialValue = JSON.stringify(initialValue, null, '  ')
  ngOnInit () {
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
  get valueHtml () {
    return hljs.highlight('json', JSON.stringify(this.value, null, '  ')).value
  }
  updateValue ({ value, isValid }: ValidityValue<ValueType>) {
    this.value = value
    this.color = isValid ? 'black' : 'red'
  }
}
