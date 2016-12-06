import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";

import { Cancelable } from "lodash";
export type Cancelable = Cancelable;

export class StringEditor extends React.Component<common.Props<common.StringSchema, string>, {}> {
    value?: string;
    errorMessage: string;
    collapsed = false;
    locked = true;
    onChangeFunction = common.debounce((value: string) => {
        this.value = value;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }, 500);
    constructor(props: common.Props<common.ArraySchema, string>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as string;
        this.validate();
    }
    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = e.currentTarget.value;
        this.onChangeFunction(e.currentTarget.value);
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage);
    }
    render() {
        const textarea = this.useTextArea ? (
            <textarea className={this.props.theme.formControl}
                onChange={this.onChange}
                defaultValue={this.value}
                rows={10}
                readOnly={this.isReadOnly} >
            </textarea>
        ) : null;

        const input = this.useInput ? (
            <input className={this.props.theme.formControl}
                type={this.props.schema.format}
                onChange={this.onChange}
                defaultValue={this.value}
                readOnly={this.isReadOnly} />
        ) : null;

        const select = this.useSelect ? (
            <select className={this.props.theme.formControl}
                onChange={this.onChange}
                defaultValue={this.value}>
                {this.props.schema.enum!.map((e, i) => <option key={i} value={e} >{e}</option>)}
            </select>
        ) : null;

        const imagePreview = this.willPreviewImage ? <img style={common.imagePreviewStyle} src={this.getImageUrl} /> : null;

        const markdownPreview = this.willPreviewMarkdown ? <div dangerouslySetInnerHTML={{ __html: this.getMarkdown }}></div> : null;

        const codePreview = this.willPreviewCode ? <pre><code dangerouslySetInnerHTML={{ __html: this.getCode }}></code></pre> : null;

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <label className={this.props.theme.label}>
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
                        <Icon valid={this.hasLockButton}
                            onClick={this.toggleLocked}
                            text={this.locked ? this.props.icon.unlock : this.props.icon.lock}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                    </div>
                </label>
                {textarea}
                {input}
                {select}
                {imagePreview}
                {markdownPreview}
                {codePreview}
                <Description theme={this.props.theme} message={this.props.schema.description} />
                <Description theme={this.props.theme} message={this.errorMessage} />
            </div>
        );
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get useTextArea() {
        const isUnlockedCodeOrMarkdown = (this.props.schema.format === "code" || this.props.schema.format === "markdown") && (!this.locked);
        return this.value !== undefined
            && (this.props.schema.enum === undefined || this.isReadOnly)
            && (this.props.schema.format === "textarea" || isUnlockedCodeOrMarkdown);
    }
    get useInput() {
        return this.value !== undefined
            && (this.props.schema.enum === undefined || this.isReadOnly)
            && (this.props.schema.format !== "textarea" && this.props.schema.format !== "code" && this.props.schema.format !== "markdown");
    }
    get useSelect() {
        return this.value !== undefined && this.props.schema.enum !== undefined && !this.isReadOnly;
    }
    get hasLockButton() {
        return this.value !== undefined
            && (this.props.schema.enum === undefined || this.isReadOnly)
            && (this.props.schema.format === "code" || this.props.schema.format === "markdown");
    }
    get canPreviewImage() {
        return common.isImageUrl(this.value);
    }
    get canPreviewMarkdown() {
        return this.props.md && this.props.schema.format === "markdown";
    }
    get canPreviewCode() {
        return this.props.hljs && this.props.schema.format === "code";
    }
    get canPreview() {
        return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
    }
    get getImageUrl() {
        return this.props.forceHttps ? common.replaceProtocal(this.value!) : this.value;
    }
    get getMarkdown() {
        return this.props.md!.render(this.value!);
    }
    get getCode() {
        return this.props.hljs!.highlightAuto(this.value!).value;
    }
    get willPreviewImage() {
        return this.value && !this.collapsed && this.canPreviewImage;
    }
    get willPreviewMarkdown() {
        return this.value && !this.collapsed && this.canPreviewMarkdown;
    }
    get willPreviewCode() {
        return this.value && !this.collapsed && this.canPreviewCode;
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale);
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as string | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    toggleLocked = () => {
        this.locked = !this.locked;
        this.setState({ locked: this.locked });
    }
}
