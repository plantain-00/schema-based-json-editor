import * as React from 'react'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { Select2, Select2UpdateValue, Select2Option } from 'select2-react-component'

/**
 * @public
 */
export type Props = common.Props<common.BooleanSchema, boolean>
/**
 * @public
 */
export type State = Partial<{
  value?: boolean;
  willRender: boolean;
}>

export class BooleanEditor extends React.Component<Props, State> {
  private value?: boolean
  private willRender = false
  constructor (props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as boolean
  }
  componentDidMount () {
    this.props.updateValue(this.value, true)
  }
  shouldComponentUpdate (nextProps: Props, nextState: State) {
    if (this.willRender) {
      this.willRender = false
      return true
    }
    return this.props.initialValue !== nextProps.initialValue
  }
  render () {
    let control: JSX.Element | null = null
    if (this.value !== undefined) {
      if (this.props.schema.format === 'checkbox') {
        control = (
          <div>
            <span className={this.props.theme.checkbox}>
              <label>
                <input type='checkbox'
                  onChange={this.onChange}
                  checked={this.value}
                  disabled={this.isReadOnly} />
                {this.props.locale.info.true}
              </label>
            </span>
          </div>
        )
      } else if (this.props.schema.format === 'select') {
        control = (
          <select value={String(this.value)}
            className={this.props.theme.select}
            disabled={this.isReadOnly}
            onChange={(e) => this.onChange()}>
            <option value='true'>{this.props.locale.info.true}</option>
            <option value='false'>{this.props.locale.info.false}</option>
          </select>
        )
      } else if (this.props.schema.format === 'select2') {
        control = (
          <Select2 data={this.booleanOptions}
            value={String(this.value)}
            disabled={this.isReadOnly}
            update={(e: Select2UpdateValue) => this.onChange()}>
          </Select2>
        )
      } else {
        control = (
          <div>
            <span className={this.props.theme.radiobox}>
              <label>
                <input type='radio'
                  onChange={this.onChange}
                  checked={this.value}
                  disabled={this.isReadOnly} />
                {this.props.locale.info.true}
              </label>
            </span>
            <span className={this.props.theme.radiobox}>
              <label>
                <input type='radio'
                  onChange={this.onChange}
                  checked={!this.value}
                  disabled={this.isReadOnly} />
                {this.props.locale.info.false}
              </label>
            </span>
          </div>
        )
      }
    }

    return (
      <div className={this.props.theme.row}>
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
        {control}
        <Description theme={this.props.theme} message={this.props.schema.description} />
      </div>
    )
  }
  private onChange = () => {
    this.value = !this.value
    this.setState({ value: this.value })
    this.props.updateValue(this.value, true)
  }
  private toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as boolean | undefined
    this.willRender = true
    this.setState({ value: this.value })
    this.props.updateValue(this.value, true)
  }
  private get isReadOnly () {
    return this.props.readonly || this.props.schema.readonly
  }
  private get hasDeleteButtonFunction () {
    return this.props.onDelete && !this.isReadOnly
  }
  private get titleToShow () {
    return common.getTitle(this.props.title, this.props.schema.title)
  }
  private get booleanOptions (): Select2Option[] {
    return [
      {
        value: 'true',
        label: this.props.locale.info.true
      },
      {
        value: 'false',
        label: this.props.locale.info.false
      }
    ]
  }
}
