import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";

export class StringEditor extends React.Component<common.Props<common.StringSchema, string>, {}> {
    private value?: string;
    private errorMessage: string;
    private collapsed = false;
    constructor(props: common.Props<common.ArraySchema, string>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as string;
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage);
    }
    render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                if (this.props.schema.format === "textarea"
                    || this.props.schema.format === "code"
                    || this.props.schema.format === "markdown") {
                    control = (
                        <textarea className={this.props.theme.formControl}
                            onChange={this.onChange}
                            defaultValue={this.value}
                            rows={5}
                            readOnly={this.props.readonly || this.props.schema.readonly} >
                        </textarea>
                    );
                } else {
                    control = (
                        <input className={this.props.theme.formControl}
                            type={this.props.schema.format}
                            onChange={this.onChange}
                            defaultValue={this.value}
                            readOnly={this.props.readonly || this.props.schema.readonly} />
                    );
                }
            } else {
                const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
                control = (
                    <select className={this.props.theme.formControl}
                        onChange={this.onChange}
                        defaultValue={this.value}>
                        {options}
                    </select>
                );
            }
        }

        let errorDescription: JSX.Element | null = null;
        if (this.errorMessage) {
            errorDescription = <p className={this.props.theme.help}>{this.errorMessage}</p>;
        }
        let optionalCheckbox: JSX.Element | null = null;
        if (!this.props.required && (this.value === undefined || !this.props.schema.readonly)) {
            optionalCheckbox = (
                <div className={this.props.theme.optionalCheckbox}>
                    <label>
                        <input type="checkbox"
                            onChange={this.toggleOptional}
                            checked={this.value === undefined}
                            disabled={this.props.readonly || this.props.schema.readonly} />
                        is undefined
                    </label>
                </div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete) {
            deleteButton = (
                <button className={this.props.theme.button} onClick={this.props.onDelete}>
                    <Icon icon={this.props.icon} text={this.props.icon.delete}></Icon>
                </button>
            );
        }
        let titleView: JSX.Element | null = null;
        if (this.props.title) {
            titleView = (
                <label className={this.props.theme.label}>
                    {this.props.title}
                </label>
            );
        }
        const canPreviewImage = common.isImageUrl(this.value);
        const canPreviewMarkdown = this.props.md && this.props.schema.format === "markdown";
        const canPreviewCode = this.props.hljs && this.props.schema.format === "code";
        let previewButton: JSX.Element | null = null;
        if (this.value && (canPreviewImage || canPreviewMarkdown || canPreviewCode)) {
            previewButton = (
                <button className={this.props.theme.button} onClick={this.collapseOrExpand}>
                    <Icon icon={this.props.icon} text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}></Icon>
                </button>
            );
        }
        let imagePreview: JSX.Element | null = null;
        let markdownPreview: JSX.Element | null = null;
        let codePreview: JSX.Element | null = null;
        if (this.value && !this.collapsed) {
            if (canPreviewImage) {
                const url = this.props.forceHttps ? common.replaceProtocal(this.value) : this.value;
                imagePreview = <img style={common.imagePreviewStyle} src={url} />;
            } else if (canPreviewMarkdown) {
                const html = this.props.md.render(this.value);
                markdownPreview = <div dangerouslySetInnerHTML={{ __html: html }}></div>;
            } else if (canPreviewCode) {
                const html = this.props.hljs!.highlightAuto(this.value).value;
                codePreview = <pre><code dangerouslySetInnerHTML={{ __html: html }}></code></pre>;
            }
        }
        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                {titleView}
                <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                    {optionalCheckbox}
                    {deleteButton}
                    {previewButton}
                </div>
                {control}
                {imagePreview}
                {markdownPreview}
                {codePreview}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {errorDescription}
            </div>
        );
    }
    private onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = e.currentTarget.value;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    private validate() {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale);
    }
    private toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as string | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    private collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
}
