import { Component, ChangeDetectionStrategy } from '@angular/core'

import { ValidityValue, ValueType } from '../dist/'
import { schema, initialValue, propertiesSchema, propertiesInitialValue, theme, icon, addAllCssLinks } from 'schema-based-json-editor/demo/'

import * as dragula from 'dragula'
import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'

addAllCssLinks('../../../core/demo/css/')

@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="position: relative">
      <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/angular/demo" target="_blank">the source code of the demo</a>
      <br/>
      <div style="width: 30%; margin: 10px; position: absolute;" class="bootstrap3-row-container">
        <json-editor [schema]="propertiesSchema"
          [initialValue]="propertiesInitialValue"
          (updateValue)="updatePropertiesValue($event)"
          [theme]="theme"
          [icon]="icon"
          [locale]="locale"
          [dragula]="dragula"
          [markdownit]="markdownit"
          [hljs]="hljs">
        </json-editor>
      </div>
      <div style="width: 35%; margin: 10px; position: absolute; left: 31%" class="bootstrap3-row-container">
        <json-editor [schema]="schema"
          [initialValue]="initialValue"
          (updateValue)="updateValue($event)"
          [theme]="theme"
          [icon]="icon"
          [locale]="locale"
          [dragula]="dragula"
          [markdownit]="markdownit"
          [hljs]="hljs">
        </json-editor>
      </div>
      <div style="width: 30%; margin: 10px; position: absolute; right: 10px;">
        Value:
        <pre [style.borderColor]="color"><code [innerHTML]="valueHtml"></code></pre>
      </div>
    </div>
    `
})
export class MainComponent {
  locale = null
  schema = schema
  initialValue: any = initialValue
  color = 'black'
  dragula = dragula
  markdownit = MarkdownIt as any
  hljs = hljs
  propertiesSchema = propertiesSchema
  propertiesInitialValue = propertiesInitialValue
  theme = theme
  icon = icon
  ngOnInit () {
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
  get valueHtml () {
    return hljs.highlight('json', JSON.stringify(this.initialValue, null, '  ')).value
  }
  updateValue ({ value, isValid }: ValidityValue<ValueType>) {
    this.initialValue = value
    this.color = isValid ? 'black' : 'red'
  }
}
