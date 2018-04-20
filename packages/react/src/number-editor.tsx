import * as React from 'react'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { Select2, Select2UpdateValue, Select2Option } from 'select2-react-component'

/**
 * @public
 */
export type Props = common.Props<common.NumberSchema, number>
/**
 * @public
 */
export type State = Partial<{
  value?: number;
  errorMessage: string;
  willRender: boolean;
}>

export class NumberEditor extends React.Component<Props, State> {
  private value?: number
  private errorMessage!: string
  private willRender = false
  constructor (props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as number
    this.validate()
  }
  componentDidMount () {
    this.props.updateValue(this.value, !this.errorMessage)
  }
  shouldComponentUpdate (nextProps: Props, nextState: State) {
    if (this.willRender) {
      this.willRender = false
      return true
    }
    return this.props.initialValue !== nextProps.initialValue
  }
  render () {
    const input = this.useInput ? (
      <input className={this.errorMessage ? this.props.theme.errorInput : this.props.theme.input}
        type='number'
        onChange={this.onChange}
        defaultValue={String(this.value)}
        readOnly={this.isReadOnly}
        disabled={this.isReadOnly} />
    ) : null

    let select: JSX.Element | null = null
    if (this.useSelect) {
      if (this.useSelectComponent) {
        const options = this.options.map(op => <option key={op.value as (string | number)} value={op.value as (string | number)}>{op.label}</option>)
        select = <select value={this.value}
          className={this.props.theme.select}
          disabled={this.isReadOnly}
          onChange={(e) => this.updateSelection(+e.target.value)}>
          {options}
        </select>
      } else if (this.useSelect2Component) {
        select = <Select2 data={this.options}
          value={this.value}
          disabled={this.isReadOnly}
          update={(e: Select2UpdateValue) => this.updateSelection(e)}>
        </Select2>
      } else if (this.useRadioBoxComponent) {
        const options = this.options.map(option => <span key={option.value as (string | number)} className={this.props.theme.radiobox}>
          <label>
            <input type='radio'
              onChange={() => this.updateSelection(option.value)}
              checked={this.value === option.value}
              disabled={this.isReadOnly} />
            {option.label}
          </label>
        </span>)
        select = <div>
          {options}
        </div>
      }
    }

    return (
      <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
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
        {input}
        {select}
        <Description theme={this.props.theme} message={this.props.schema.description} />
        <Description theme={this.props.theme} message={this.errorMessage} />
      </div>
    )
  }
  private onChange = (e: React.FormEvent<{ value: string }>) => {
    this.value = this.props.schema.type === 'integer' ? common.toInteger(e.currentTarget.value) : common.toNumber(e.currentTarget.value)
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
  private validate () {
    this.errorMessage = common.getErrorMessageOfNumber(this.value, this.props.schema, this.props.locale)
  }
  private toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as number | undefined
    this.validate()
    this.willRender = true
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
  private get useInput () {
    return this.value !== undefined && (this.props.schema.enum === undefined || this.isReadOnly)
  }
  private get useSelect () {
    return this.value !== undefined && (this.props.schema.enum !== undefined && !this.isReadOnly)
  }
  private get useSelect2Component () {
    return this.useSelect && !this.props.noSelect2 && this.props.schema.format !== 'select' && this.props.schema.format !== 'radiobox'
  }
  private get useSelectComponent () {
    return this.useSelect && (this.props.schema.format === 'select' || this.props.noSelect2)
  }
  private get useRadioBoxComponent () {
    return this.useSelect && this.props.schema.format === 'radiobox'
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
  private get options () {
    return common.getOptions(this.props.schema) as Select2Option[]
  }

  private updateSelection (value: Select2UpdateValue) {
    this.value = +value
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
}
