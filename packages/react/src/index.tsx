import * as React from 'react'
import * as common from 'schema-based-json-editor'
export * from 'schema-based-json-editor'
import { Editor } from './editor'
import { Dragula, MarkdownItType, MarkdownIt, HLJS } from 'schema-based-json-editor/dist/libs'

/**
 * @public
 */
export type Props = {
  schema: common.Schema;
  initialValue: common.ValueType;
  updateValue: (value: common.ValueType | undefined, isValid: boolean) => void;
  theme?: string;
  icon?: string;
  locale?: common.Locale | null;
  readonly?: boolean;
  dragula?: Dragula;
  markdownit?: MarkdownItType;
  hljs?: HLJS;
  forceHttps?: boolean;
  disableCollapse?: boolean;
  noSelect2?: boolean;
}

/**
 * @public
 */
export class JSONEditor extends React.Component<Props, {}> {
  private md?: MarkdownIt
  constructor (props: Props) {
    super(props)
    this.md = common.initializeMarkdown(this.props.markdownit, this.props.hljs, this.props.forceHttps)
  }
  render () {
    const theme = common.getTheme(this.props.theme)
    const locale = common.getLocale(this.props.locale)
    const icon = common.getIcon(this.props.icon, locale)
    return <Editor schema={this.props.schema}
      initialValue={this.props.initialValue}
      updateValue={this.updateValue}
      readonly={this.props.readonly}
      theme={theme}
      locale={locale}
      icon={icon}
      required={true}
      dragula={this.props.dragula}
      md={this.md}
      hljs={this.props.hljs}
      forceHttps={this.props.forceHttps}
      disableCollapse={this.props.disableCollapse}
      noSelect2={this.props.noSelect2} />
  }
  private updateValue = (value: any, isValid: boolean) => {
    this.props.updateValue(value, isValid)
  }
}
