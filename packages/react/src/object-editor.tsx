import * as React from 'react'
import * as common from 'schema-based-json-editor'
import { Editor } from './editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'

/**
 * @public
 */
export type Props = common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>
/**
 * @public
 */
export type State = Partial<{
  collapsed?: boolean;
  value?: { [name: string]: common.ValueType };
  invalidProperties: string[];
  errorMessage: string;
  properties: { property: string; schema: common.Schema }[];
  filter: string;
}>

export class ObjectEditor extends React.Component<Props, State> {
  private collapsed = this.props.schema.collapsed
  private value?: { [name: string]: common.ValueType }
  private invalidProperties: string[] = []
  private errorMessage!: string
  private properties: { property: string; schema: common.Schema; propertyName: string }[] = []
  private filter = ''
  constructor(props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType }
    this.validate()
    if (this.value !== undefined) {
      for (const property in this.props.schema.properties) {
        if (this.props.schema.properties.hasOwnProperty(property)) {
          const schema = this.props.schema.properties[property]
          const propertyName = schema.propertyName || property
          if (this.isRequired(property) !== false) {
            const required = this.props.schema.required && this.props.schema.required.some(r => r === property)
            this.value[propertyName] = common.getDefaultValue(required, schema, this.value[propertyName]) as { [name: string]: common.ValueType }
          }
          this.properties.push({
            property,
            propertyName,
            schema
          })
        }
      }
      this.properties = this.properties.sort(common.compare)
    }
  }
  componentDidMount() {
    this.props.updateValue(this.value, this.invalidProperties.length === 0)
  }
  render() {
    const childrenElement: JSX.Element[] = (!this.collapsed && this.value !== undefined)
      ? this.properties.filter(p => common.filterObject(p, this.filter) && this.isRequired(p.property) !== false)
        .map(({ property, propertyName, schema }) => <Editor key={property + this.isRequired(property)}
          schema={schema}
          getReference={this.props.getReference}
          title={schema.title || propertyName}
          initialValue={this.value![propertyName]}
          updateValue={(value: common.ValueType | undefined, isValid: boolean) => this.onChange(propertyName, value, isValid)}
          theme={this.props.theme}
          icon={this.props.icon}
          locale={this.props.locale}
          required={this.isRequired(property)}
          readonly={this.isReadOnly}
          dragula={this.props.dragula}
          md={this.props.md}
          hljs={this.props.hljs}
          forceHttps={this.props.forceHttps}
          disableCollapse={this.props.disableCollapse}
          minItemCountIfNeedFilter={this.props.minItemCountIfNeedFilter}
          noSelect2={this.props.noSelect2}
          monacoEditor={this.props.monacoEditor} />)
      : []
    const filterElement: JSX.Element | null = (!this.collapsed && this.value !== undefined && this.showFilter)
      ? <div className={this.props.theme.row}><input className={this.props.theme.input}
        onChange={this.onFilterChange}
        placeholder={this.props.locale.info.search}
        defaultValue={this.filter} /></div>
      : null

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
            <Icon valid={!this.props.disableCollapse}
              onClick={this.collapseOrExpand}
              text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}
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
        <div className={this.props.theme.card}>
          {filterElement}
          {childrenElement}
        </div>
        <Description theme={this.props.theme} message={this.errorMessage} />
      </div >
    )
  }
  private collapseOrExpand = () => {
    this.collapsed = !this.collapsed
    this.setState({ collapsed: this.collapsed })
  }
  private toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType } | undefined
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, this.invalidProperties.length === 0)
  }
  private onFilterChange = (e: React.FormEvent<{ value: string }>) => {
    this.filter = e.currentTarget.value
    this.setState({ filter: this.filter })
  }
  private onChange = (property: string, value: common.ValueType | undefined, isValid: boolean) => {
    this.value![property] = value
    for (const p in this.props.schema.properties) {
      if (this.isRequired(p) === false) {
        this.value![p] = undefined
      }
    }
    this.validate()
    this.setState({ value: this.value })
    common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property)
    this.props.updateValue(this.value, !this.errorMessage && this.invalidProperties.length === 0)
  }
  private isRequired(property: string) {
    return common.isRequired(this.props.schema.required, this.value, this.props.schema, property)
  }
  private validate() {
    this.errorMessage = common.getErrorMessageOfObject(this.value, this.props.schema, this.props.locale)
  }
  private get isReadOnly() {
    return this.props.readonly || this.props.schema.readonly
  }
  private get hasDeleteButtonFunction() {
    return this.props.onDelete && !this.isReadOnly
  }
  private get titleToShow() {
    if (this.props.onDelete) {
      return common.getTitle(common.findTitle(this.value, this.properties), this.props.title, this.props.schema.title)
    }
    return common.getTitle(this.props.title, this.props.schema.title)
  }
  private get showFilter() {
    const propertyCount = this.properties.filter(p => this.isRequired(p.property) !== false).length
    const minItemCountIfNeedFilter = typeof this.props.minItemCountIfNeedFilter === 'number' ? this.props.minItemCountIfNeedFilter : common.minItemCountIfNeedFilter
    return propertyCount >= minItemCountIfNeedFilter
  }
  private get className() {
    const rowClass = this.errorMessage ? this.props.theme.errorRow : this.props.theme.row
    return this.props.schema.className ? rowClass + ' ' + this.props.schema.className : rowClass
  }
}
