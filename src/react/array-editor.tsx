import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";
import { dragula } from "../../typings/lib";

export class ArrayEditor extends React.Component<common.Props<common.ArraySchema, common.ValueType[]>, { value?: common.ValueType[]; collapsed?: boolean; renderSwitch?: number }> {
    renderSwitch = 1;
    collapsed = false;
    value?: common.ValueType[];
    drak?: dragula.Drake;
    errorMessage: string;
    invalidIndexes: number[] = [];
    constructor(props: common.Props<common.ArraySchema, common.ValueType[]>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as common.ValueType[];
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
        if (this.props.dragula) {
            const container = ReactDOM.findDOMNode(this).childNodes[2] as HTMLElement;
            this.drak = this.props.dragula([container]);
            this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
                if (this.value) {
                    common.switchItem(this.value, el, sibling);
                    this.renderSwitch = -this.renderSwitch;
                    this.setState({ value: this.value, renderSwitch: this.renderSwitch });
                    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
                }
            });
        }

    }
    componentWillUnmount() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    render() {
        const childrenElement: JSX.Element[] = this.getValue.map((e, i) => (
            <div key={(1 + i) * this.renderSwitch} data-index={i} className={this.props.theme.rowContainer}>
                <Editor schema={this.props.schema.items}
                    title={String(i)}
                    initialValue={this.getValue[i]}
                    updateValue={(value: common.ValueType, isValid: boolean) => this.onChange(i, value, isValid)}
                    theme={this.props.theme}
                    icon={this.props.icon}
                    locale={this.props.locale}
                    required={true}
                    readonly={this.isReadOnly}
                    onDelete={() => this.onDeleteFunction(i)}
                    dragula={this.props.dragula}
                    md={this.props.md}
                    hljs={this.props.hljs}
                    forceHttps={this.props.forceHttps} />
            </div>
        ));

        const deleteButton = this.hasDeleteButton ? (
            <button className={this.props.theme.button} onClick={this.props.onDelete}>
                <Icon icon={this.props.icon} text={this.props.icon.delete}></Icon>
            </button>
        ) : null;

        const addButton = this.hasAddButton ? (
            <button className={this.props.theme.button} onClick={this.addItem}>
                <Icon icon={this.props.icon} text={this.props.icon.add}></Icon>
            </button>
        ) : null;

        const optionalCheckbox = this.hasOptionalCheckbox ? (
            <div className={this.props.theme.optionalCheckbox}>
                <label>
                    <input type="checkbox"
                        onChange={this.toggleOptional}
                        checked={this.value === undefined}
                        disabled={this.isReadOnly} />
                    {this.props.locale.info.notExists}
                </label>
            </div>
        ) : null;

        const errorDescription = this.errorMessage ? <p className={this.props.theme.help}>{this.errorMessage}</p> : null;

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <h3>
                    {this.titleToShow}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        {optionalCheckbox}
                        <button className={this.props.theme.button} onClick={this.collapseOrExpand}>
                            <Icon icon={this.props.icon} text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}></Icon>
                        </button>
                        {addButton}
                        {deleteButton}
                    </div>
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                <div className={this.props.theme.rowContainer}>
                    {childrenElement}
                </div>
                {errorDescription}
            </div>
        );
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as common.ValueType[] | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.props.schema, this.props.locale);
    }
    addItem = () => {
        this.value!.push(common.getDefaultValue(true, this.props.schema.items, undefined) !);
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
    }
    onChange = (i: number, value: common.ValueType, isValid: boolean) => {
        this.value![i] = value;
        this.setState({ value: this.value });
        this.validate();
        common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
    }
    onDeleteFunction = (i: number) => {
        this.value!.splice(i, 1);
        this.renderSwitch = -this.renderSwitch;
        this.setState({ value: this.value, renderSwitch: this.renderSwitch });
        this.validate();
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get hasOptionalCheckbox() {
        return !this.props.required && (this.value === undefined || !this.isReadOnly);
    }
    get hasDeleteButton() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get hasAddButton() {
        return !this.isReadOnly && this.value !== undefined;
    }
    get getValue() {
        if (this.value !== undefined && !this.collapsed) {
            return this.value;
        }
        return [];
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
