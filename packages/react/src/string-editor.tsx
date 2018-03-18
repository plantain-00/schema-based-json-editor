import * as React from 'react'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { MarkdownTip } from 'markdown-tip-react'
import { Select2, Select2UpdateValue } from 'select2-react-component'
import { FileUploader } from 'file-uploader-react-component'

/**
 * @public
 */
export type Props = common.Props<common.StringSchema, string>
/**
 * @public
 */
export type State = Partial<{
  value: string;
  errorMessage: string;
  collapsed: boolean;
  willRender: boolean;
}>

export class StringEditor extends React.Component<Props, State> {
  private value?: string
  private errorMessage!: string
  private collapsed = false
  private willRender = false
  constructor (props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as string
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
    const fileUploader = this.canUpload ? (
      <FileUploader locale={this.props.locale.fileUploaderLocale}
      fileGot={(e) => this.fileGot(e)}>
      </FileUploader>
    ) : null

    const textarea = this.useTextArea ? (
      <textarea className={this.errorMessage ? this.props.theme.errorTextarea : this.props.theme.textarea}
        onChange={this.onChange}
        defaultValue={this.value}
        rows={10}
        readOnly={this.isReadOnly}
        disabled={this.isReadOnly} >
      </textarea>
    ) : null

    const input = this.useInput ? (
      <input className={this.errorMessage ? this.props.theme.errorInput : this.props.theme.input}
        type={this.props.schema.format}
        onChange={this.onChange}
        defaultValue={this.value}
        readOnly={this.isReadOnly}
        disabled={this.isReadOnly} />
    ) : null

    const select = this.useSelect ? (
      <Select2 data={this.options}
        value={this.value}
        update={(e: Select2UpdateValue) => this.updateSelection(e)}>
      </Select2>
    ) : null

    const imagePreview = this.willPreviewImage ? <img style={common.imagePreviewStyle} src={this.getImageUrl} /> : null

    const markdownTip = this.useTextArea && this.willPreviewMarkdown ? <MarkdownTip locale={this.props.locale.markdownTipLocale}></MarkdownTip> : null
    const markdownPreview = this.willPreviewMarkdown ? <div dangerouslySetInnerHTML={{ __html: this.getMarkdown }}></div> : null

    const codePreview = this.willPreviewCode ? <pre><code dangerouslySetInnerHTML={{ __html: this.getCode }}></code></pre> : null

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
            <Icon valid={this.canPreview}
              onClick={this.collapseOrExpand}
              text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}
              theme={this.props.theme}
              icon={this.props.icon} />
          </div>
        </label>
        {fileUploader}
        {textarea}
        {input}
        {select}
        {imagePreview}
        {markdownTip}
        {markdownPreview}
        {codePreview}
        <Description theme={this.props.theme} message={this.props.schema.description} />
        <Description theme={this.props.theme} message={this.errorMessage} />
      </div>
    )
  }
  private onChange = (e: React.FormEvent<{ value: string }>) => {
    this.value = e.currentTarget.value
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
  private get isReadOnly () {
    return this.props.readonly || this.props.schema.readonly
  }
  private get hasDeleteButtonFunction () {
    return this.props.onDelete && !this.isReadOnly
  }
  private get useTextArea () {
    return this.value !== undefined
      && !this.collapsed
      && (this.props.schema.enum === undefined || this.isReadOnly)
      && (this.props.schema.format === 'textarea' || this.props.schema.format === 'code' || this.props.schema.format === 'markdown')
  }
  private get useInput () {
    return this.value !== undefined
      && !this.collapsed
      && (this.props.schema.enum === undefined || this.isReadOnly)
      && (this.props.schema.format !== 'textarea' && this.props.schema.format !== 'code' && this.props.schema.format !== 'markdown')
  }
  private get useSelect () {
    return this.value !== undefined && this.props.schema.enum !== undefined && !this.isReadOnly
  }
  private get canPreviewImage () {
    return common.isImageUrl(this.value) || common.isBase64Image(this.value)
  }
  private get canPreviewMarkdown () {
    return this.props.md && this.props.schema.format === 'markdown'
  }
  private get canPreviewCode () {
    return this.props.hljs && this.props.schema.format === 'code'
  }
  private get canPreview () {
    return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode)
  }
  private get getImageUrl () {
    return this.props.forceHttps ? common.replaceProtocal(this.value!) : this.value
  }
  private get getMarkdown () {
    return this.props.md!.render(this.value!)
  }
  private get getCode () {
    return this.props.hljs!.highlightAuto(this.value!).value
  }
  private get willPreviewImage () {
    return this.value && !this.collapsed && this.canPreviewImage
  }
  private get willPreviewMarkdown () {
    return this.value && !this.collapsed && this.canPreviewMarkdown
  }
  private get willPreviewCode () {
    return this.value && !this.collapsed && this.canPreviewCode
  }
  private get titleToShow () {
    return common.getTitle(this.props.title, this.props.schema.title)
  }
  private get options () {
    return this.props.schema.enum!.map(e => ({
      value: e,
      label: e
    }))
  }
  private get canUpload () {
    return this.props.schema.format === 'base64'
  }

  private updateSelection (value: Select2UpdateValue) {
    this.value = value.toString()
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
  private fileGot (file: File | Blob) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.value = reader.result
      this.validate()
      this.setState({ value: this.value })
      this.props.updateValue(this.value, !this.errorMessage)
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }

  private validate () {
    this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale)
  }
  private toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as string | undefined
    this.validate()
    this.willRender = true
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
  private collapseOrExpand = () => {
    this.willRender = true
    this.collapsed = !this.collapsed
    this.setState({ collapsed: this.collapsed })
  }
}
