import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as common from 'schema-based-json-editor'
import { Select2, Select2Option } from 'select2-react-component'
import { Editor } from './editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'

/**
 * @public
 */
export type Props = common.Props<common.ArraySchema, common.ValueType[]>
/**
 * @public
 */
export type State = Partial<{
  renderSwitch: number;
  collapsed?: boolean;
  value?: common.ValueType[];
  drak?: dragula.Drake;
  errorMessage: string;
  invalidIndexes: number[];
  filter: string;
}>

export class ArrayEditor extends React.Component<Props, State> {
  private renderSwitch = 1
  private collapsed = this.props.schema.collapsed
  private value?: common.ValueType[]
  private drak?: dragula.Drake
  private errorMessage!: string
  private invalidIndexes: number[] = []
  private filter: string = ''
  constructor(props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as common.ValueType[]
    this.validate()
  }
  componentDidMount() {
    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
    if (this.props.dragula) {
      const container = common.findContainer(ReactDOM.findDOMNode(this as any)!.childNodes)!
      this.drak = this.props.dragula([container])
      this.drak!.on('drop', (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
        if (this.value) {
          common.switchItem(this.value, el, sibling)
          this.renderSwitch = -this.renderSwitch
          this.setState({ value: this.value, renderSwitch: this.renderSwitch })
          this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
        }
      })
    }
  }
  componentWillUnmount() {
    if (this.drak) {
      this.drak.destroy()
    }
  }
  render() {
    const childrenElement: JSX.Element[] = this.getValue.map((p, i) => ({ p, i }))
      .filter(({ p, i }) => common.filterArray(p, i, this.props.schema.items, this.filter))
      .map(({ p, i }) => (
        <div key={(1 + i) * this.renderSwitch} data-index={i} className={this.props.theme.card}>
          <Editor schema={this.props.schema.items}
            title={String(i)}
            initialValue={this.getValue[i]}
            updateValue={(value: common.ValueType | undefined, isValid: boolean) => this.onChange(i, value, isValid)}
            theme={this.props.theme}
            icon={this.props.icon}
            locale={this.props.locale}
            required={true}
            readonly={this.isReadOnly}
            onDelete={() => this.onDeleteFunction(i)}
            dragula={this.props.dragula}
            md={this.props.md}
            hljs={this.props.hljs}
            forceHttps={this.props.forceHttps}
            disableCollapse={this.props.disableCollapse}
            noSelect2={this.props.noSelect2}
            monacoEditor={this.props.monacoEditor} />
        </div>
      ))
    const filterElement: JSX.Element | null = (!this.collapsed && this.value !== undefined && this.showFilter)
      ? <div className={this.props.theme.row}><input className={this.props.theme.input}
        onChange={this.onFilterChange}
        defaultValue={this.filter} /></div>
      : null

    let element: JSX.Element
    if (this.props.schema.enum) {
      let format: JSX.Element | JSX.Element[]
      if (this.props.schema.format === 'select2' && !this.props.noSelect2) {
        format = (
          <Select2 data={this.options}
            value={this.value as any}
            disabled={this.isReadOnly}
            multiple={true}
            update={($event) => this.onChangeSelect2($event)}>
          </Select2>
        )
      } else {
        format = this.options.map(option => (
          <span key={option.value as (string | number)} className={this.props.theme.checkbox}>
            <label>
              <input type='checkbox'
                onChange={() => this.onChangeCheckbox(option.value)}
                checked={this.isChecked(option.value)}
                disabled={this.isReadOnly} />
              {option.label}
            </label>
          </span>
        ))
      }
      element = (
        <div>
          {format}
        </div>
      )
    } else {
      element = (
        <div className={this.props.theme.card}>
          {filterElement}
          {childrenElement}
        </div>
      )
    }

    return (
      <div className={this.className}>
        <h3>
          {this.titleToShow}
          <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
            <Optional required={this.props.required}
              value={this.value}
              isReadOnly={this.isReadOnly}
              theme={this.props.theme}
              locale={this.props.locale}
              toggleOptional={this.toggleOptional} />
            <Icon valid={!this.props.disableCollapse && this.value && this.value.length > 0 && !this.props.schema.enum}
              onClick={this.collapseOrExpand}
              text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}
              theme={this.props.theme}
              icon={this.props.icon} />
            <Icon valid={this.hasAddButton}
              onClick={this.addItem}
              text={this.props.icon.add}
              theme={this.props.theme}
              icon={this.props.icon} />
            <Icon valid={this.hasDeleteButtonFunction}
              onClick={this.props.onDelete!}
              text={this.props.icon.delete}
              theme={this.props.theme}
              icon={this.props.icon} />
          </div>
        </h3>
        <Description theme={this.props.theme} message={this.props.schema.description} />
        {element}
        <Description theme={this.props.theme} message={this.errorMessage} />
      </div>
    )
  }
  private collapseOrExpand = () => {
    this.collapsed = !this.collapsed
    this.setState({ collapsed: this.collapsed })
  }
  private toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as common.ValueType[] | undefined
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
  }
  private validate() {
    this.errorMessage = common.getErrorMessageOfArray(this.value, this.props.schema, this.props.locale)
  }
  private addItem = () => {
    this.value!.push(common.getDefaultValue(true, this.props.schema.items, undefined)!)
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
  }
  private onChange = (i: number, value: common.ValueType | undefined, isValid: boolean) => {
    this.value![i] = value
    this.setState({ value: this.value })
    this.validate()
    common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i)
    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
  }
  private onFilterChange = (e: React.FormEvent<{ value: string }>) => {
    this.filter = e.currentTarget.value
    this.setState({ filter: this.filter })
  }
  private onDeleteFunction = (i: number) => {
    this.value!.splice(i, 1)
    this.renderSwitch = -this.renderSwitch
    this.setState({ value: this.value, renderSwitch: this.renderSwitch })
    this.validate()
    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
  }
  private isChecked = (value: any) => {
    return this.value && this.value.indexOf(value) !== -1
  }
  private onChangeCheckbox = (value: any) => {
    if (this.value) {
      const index = this.value.indexOf(value)
      if (index !== -1) {
        this.value.splice(index, 1)
      } else {
        this.value.push(value)
      }
      this.validate()
      this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
    }
  }
  private onChangeSelect2 = (value: any) => {
    this.value = value
    this.validate()
    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0)
  }
  private get isReadOnly() {
    return this.props.readonly || this.props.schema.readonly
  }
  private get hasDeleteButtonFunction() {
    return this.props.onDelete && !this.isReadOnly
  }
  private get hasAddButton() {
    return !this.isReadOnly && this.value !== undefined && !this.props.schema.enum
  }
  private get getValue() {
    if (this.value !== undefined && !this.collapsed) {
      return this.value
    }
    return []
  }
  private get titleToShow() {
    return common.getTitle(this.props.title, this.props.schema.title)
  }
  private get showFilter() {
    const minItemCountIfNeedFilter = typeof this.props.minItemCountIfNeedFilter === 'number' ? this.props.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
    return this.getValue.length >= minItemCountIfNeedFilter
  }
  private get className() {
    const rowClass = this.errorMessage ? this.props.theme.errorRow : this.props.theme.row
    return this.props.schema.className ? rowClass + ' ' + this.props.schema.className : rowClass
  }
  private get options() {
    return common.getOptions(this.props.schema) as Select2Option[]
  }
}
