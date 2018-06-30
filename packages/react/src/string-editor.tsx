import * as React from 'react'
import * as common from 'schema-based-json-editor'
import { Icon } from './icon'
import { Optional } from './optional'
import { Description } from './description'
import { MarkdownTip } from 'markdown-tip-react'
import { Select2, Select2UpdateValue, Select2Option } from 'select2-react-component'
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
  private monacoEditorRef: React.RefObject<HTMLDivElement>
  private monacoCodeEditor: common.IStandaloneCodeEditor | undefined
  constructor(props: Props) {
    super(props)
    this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as string
    this.validate()
    this.monacoEditorRef = React.createRef()
  }
  componentDidMount() {
    this.props.updateValue(this.value, !this.errorMessage)
    if (this.props.monacoEditor && this.monacoEditorRef.current) {
      this.monacoCodeEditor = this.props.monacoEditor.create(this.monacoEditorRef.current, {
        value: this.value,
        language: 'json',
        minimap: { enabled: false },
        lineNumbers: 'off'
      })
      let timer: NodeJS.Timer
      this.monacoCodeEditor.onDidChangeModelContent((e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.value = this.monacoCodeEditor!.getValue()
          this.validate()
          this.setState({ value: this.value })
          this.props.updateValue(this.value, !this.errorMessage)
        }, 500)
      })
    }
  }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.willRender) {
      this.willRender = false
      return true
    }
    return this.props.initialValue !== nextProps.initialValue
  }
  componentWillUnmount() {
    if (this.monacoCodeEditor) {
      this.monacoCodeEditor.dispose()
    }
  }
  // tslint:disable-next-line:cognitive-complexity
  render() {
    const fileUploader = this.canUpload ? (
      <FileUploader locale={this.props.locale.fileUploaderLocale}
        fileGot={(e) => this.fileGot(e)}>
      </FileUploader>
    ) : null

    let textarea: JSX.Element | null = null
    if (this.useTextArea) {
      if (this.props.monacoEditor && this.props.schema.format === 'json') {
        textarea = (
          <div ref={this.monacoEditorRef} style={{
            height: '400px',
            width: '90%',
            display: this.collapsed ? 'none' : undefined
          }}>
          </div>
        )
      } else {
        textarea = (
          <textarea className={this.errorMessage ? this.props.theme.errorTextarea : this.props.theme.textarea}
            onChange={this.onChange}
            defaultValue={this.value}
            rows={10}
            readOnly={this.isReadOnly}
            disabled={this.isReadOnly} >
          </textarea>
        )
      }
    }

    const input = this.useInput ? (
      <input className={this.errorMessage ? this.props.theme.errorInput : this.props.theme.input}
        type={this.props.schema.format}
        onChange={this.onChange}
        defaultValue={this.value}
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
          onChange={(e) => this.updateSelection(e.target.value)}>
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

    const imagePreview = this.willPreviewImage ? <img style={common.imagePreviewStyle} src={this.getImageUrl} /> : null

    const markdownTip = this.useTextArea && !this.collapsed && this.willPreviewMarkdown ? <MarkdownTip locale={this.props.locale.markdownTipLocale}></MarkdownTip> : null
    const markdownPreview = this.willPreviewMarkdown ? <div dangerouslySetInnerHTML={{ __html: this.getMarkdown }}></div> : null

    const codePreview = this.willPreviewCode ? <pre><code dangerouslySetInnerHTML={{ __html: this.getCode }}></code></pre> : null

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
  private get isReadOnly() {
    return this.props.readonly || this.props.schema.readonly
  }
  private get hasDeleteButtonFunction() {
    return this.props.onDelete && !this.isReadOnly
  }
  private get useTextArea() {
    return this.value !== undefined
      && (this.props.schema.enum === undefined || this.isReadOnly)
      && (this.props.schema.format === 'textarea' || this.props.schema.format === 'code' || this.props.schema.format === 'json' || this.props.schema.format === 'markdown')
  }
  private get useInput() {
    return this.value !== undefined
      && !this.collapsed
      && (this.props.schema.enum === undefined || this.isReadOnly)
      && (this.props.schema.format !== 'textarea' && this.props.schema.format !== 'code' && this.props.schema.format !== 'json' && this.props.schema.format !== 'markdown')
  }
  private get useSelect() {
    return this.value !== undefined && this.props.schema.enum !== undefined && !this.isReadOnly
  }
  private get useSelect2Component() {
    return this.useSelect && !this.props.noSelect2 && this.props.schema.format !== 'select' && this.props.schema.format !== 'radiobox'
  }
  private get useSelectComponent() {
    return this.useSelect && (this.props.schema.format === 'select' || this.props.noSelect2)
  }
  private get useRadioBoxComponent() {
    return this.useSelect && this.props.schema.format === 'radiobox'
  }

  private get canPreviewImage() {
    return common.isImageUrl(this.value) || common.isBase64Image(this.value)
  }
  private get canPreviewMarkdown() {
    return this.props.md && this.props.schema.format === 'markdown'
  }
  private get canPreviewCode() {
    return this.props.hljs && this.props.schema.format === 'code'
  }
  private get canPreview() {
    return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode)
  }
  private get getImageUrl() {
    return this.props.forceHttps ? common.replaceProtocal(this.value!) : this.value
  }
  private get getMarkdown() {
    return this.props.md!.render(this.value!)
  }
  private get getCode() {
    return this.props.hljs!.highlightAuto(this.value!).value
  }
  private get willPreviewImage() {
    return this.value && !this.collapsed && this.canPreviewImage
  }
  private get willPreviewMarkdown() {
    return this.value && !this.collapsed && this.canPreviewMarkdown
  }
  private get willPreviewCode() {
    return this.value && !this.collapsed && this.canPreviewCode
  }
  private get titleToShow() {
    return common.getTitle(this.props.title, this.props.schema.title)
  }
  private get options() {
    return common.getOptions(this.props.schema) as Select2Option[]
  }
  private get canUpload() {
    return this.props.schema.format === 'base64'
  }
  private get className() {
    const rowClass = this.errorMessage ? this.props.theme.errorRow : this.props.theme.row
    return this.props.schema.className ? rowClass + ' ' + this.props.schema.className : rowClass
  }

  private updateSelection(value: Select2UpdateValue) {
    this.value = value.toString()
    this.validate()
    this.setState({ value: this.value })
    this.props.updateValue(this.value, !this.errorMessage)
  }
  private fileGot(file: File | Blob) {
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

  private validate() {
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
