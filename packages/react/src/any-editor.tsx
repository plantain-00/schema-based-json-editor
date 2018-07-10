import * as React from 'react'
import JSON5 from 'json5'
import * as common from 'schema-based-json-editor'

import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'

/**
 * @public
 */
export type Props = common.Props<common.AnySchema, common.ValueType>
/**
 * @public
 */
export type State = Partial<{
  value?: common.ValueType;
  errorMessage: string;
}>

export class AnyEditor extends React.Component<Props, State> {
  private value?: common.ValueType
  private monacoEditorRef: React.RefObject<HTMLDivElement>
  private monacoCodeEditor: common.IStandaloneCodeEditor | undefined

  constructor(props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue)
    this.monacoEditorRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.monacoEditor && this.monacoEditorRef.current) {
      this.monacoCodeEditor = this.props.monacoEditor.create(this.monacoEditorRef.current, {
        value: 'export default ' + JSON5.stringify(this.value, null, 2),
        language: 'javascript',
        minimap: { enabled: false },
        lineNumbers: 'off'
      })
      let timer: NodeJS.Timer
      this.monacoCodeEditor.onDidChangeModelContent((e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          try {
            let value = this.monacoCodeEditor!.getValue()
            if (value.indexOf('export default') === 0) {
              value = value.substring('export default'.length)
            }
            this.value = JSON5.parse(value)
            this.setState({ value: this.value })
            this.props.updateValue(this.value, true)
          } catch (error) {
            // do nothing
          }
        }, 500)
      })
    }
  }

  render() {
    return (
      <div className={this.className}>
        <label className={this.props.theme.title}>
          {this.titleToShow}
          <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
            <Optional required={this.props.required}
              value={this.value}
              isReadOnly={this.isReadOnly}
              theme={this.props.theme}
              locale={this.props.locale}
              toggleOptional={this.toggleOptional} />
            <Icon valid={this.hasDeleteButtonFunction}
              onClick={this.props.onDelete!}
              text={this.props.icon.delete}
              theme={this.props.theme}
              icon={this.props.icon} />
          </div>
        </label>
        <div ref={this.monacoEditorRef} style={{
          height: '400px',
          width: '90%'
        }}>
        </div>
        <Description theme={this.props.theme} message={this.props.schema.description} />
      </div>
    )
  }

  private get className() {
    const rowClass = this.props.theme.row
    return this.props.schema.className ? rowClass + ' ' + this.props.schema.className : rowClass
  }

  private get titleToShow() {
    return common.getTitle(this.props.title, this.props.schema.title)
  }

  private get isReadOnly() {
    return this.props.readonly || this.props.schema.readonly
  }

  private get hasDeleteButtonFunction() {
    return this.props.onDelete && !this.isReadOnly
  }

  private toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as string | undefined
    this.setState({ value: this.value })
    this.props.updateValue(this.value, true)
  }
}
