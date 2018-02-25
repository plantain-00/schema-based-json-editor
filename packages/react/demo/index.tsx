import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { JSONEditor } from '../dist/'
import { schema, schemaSchema, initialValue, initialValueSchema } from 'schema-based-json-editor/demo/'
import * as dragula from 'dragula'
import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'

class Main extends React.Component<{}, {}> {
  private locale = null
  private schema = schema
  private value = initialValue
  private isValid = false
  private schemaSchema = schemaSchema
  private initialValueSchema = initialValueSchema
  private editingSchema = JSON.stringify(schema, null, '  ')
  private editingInitialValue = JSON.stringify(initialValue, null, '  ')
  componentWillMount () {
    if (navigator.language === 'zh-CN') {
      import('../../core/dist/locales/' + navigator.language + '.js').then(module => {
        this.locale = module.locale
        this.setState({ locale: this.locale })
      })
    }
  }
  render () {
    const valueHtml = hljs.highlight('json', JSON.stringify(this.value, null, '  ')).value
    return (
      <div style={{ position: 'relative' }}>
        <a href='https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/react/demo' target='_blank'>the source code of the demo</a>
        <br />
        <div style={{ margin: '10px', width: '30%', overflowY: 'scroll', position: 'absolute' }} className='bootstrap3-row-container'>
          <JSONEditor schema={this.schemaSchema}
            initialValue={this.editingSchema}
            updateValue={this.updateSchema}
            theme='bootstrap3'
            icon='fontawesome4'
            locale={this.locale}
            dragula={dragula}
            markdownit={MarkdownIt}
            hljs={hljs}
            forceHttps={false} />
        </div>
        <div style={{ margin: '10px', width: '30%', overflowY: 'scroll', position: 'absolute', top: '300px' }} className='bootstrap3-row-container'>
          <JSONEditor schema={this.initialValueSchema}
            initialValue={this.editingInitialValue}
            updateValue={this.updateInitialValue}
            theme='bootstrap3'
            icon='fontawesome4'
            locale={this.locale}
            dragula={dragula}
            markdownit={MarkdownIt}
            hljs={hljs}
            forceHttps={false} />
        </div>
        <div style={{ width: '35%', margin: '10px', overflowY: 'scroll', position: 'absolute', left: '31%' }} className='bootstrap3-row-container'>
          <JSONEditor schema={this.schema}
            initialValue={this.value}
            updateValue={this.updateValue}
            theme='bootstrap3'
            icon='fontawesome4'
            locale={this.locale}
            dragula={dragula}
            markdownit={MarkdownIt}
            hljs={hljs}
            forceHttps={false} />
        </div>
        <div style={{ margin: '10px', width: '30%', overflowY: 'scroll', position: 'absolute', right: '10px' }}>
          Value:
          <pre style={{ borderColor: this.isValid ? 'black' : 'red' }}><code dangerouslySetInnerHTML={{ __html: valueHtml }}></code></pre>
        </div>
      </div>
    )
  }
  private updateSchema = (value: any, isValid: boolean) => {
    try {
      this.editingSchema = value as string
      localStorage.setItem('json-editor:schema', this.editingSchema)
      this.setState({ editingSchema: this.editingSchema })
    } catch (error) {
      console.log(error)
    }
  }
  private updateInitialValue = (value: any, isValid: boolean) => {
    try {
      this.editingInitialValue = value as string
      localStorage.setItem('json-editor:initial-value', this.editingInitialValue)
      this.setState({ editingInitialValue: this.editingInitialValue })
    } catch (error) {
      console.log(error)
    }
  }
  private updateValue = (value: any, isValid: boolean) => {
    this.value = value
    this.isValid = isValid
    this.setState({ value: this.value })
  }
}

ReactDOM.render(<Main />, document.getElementById('container'))
