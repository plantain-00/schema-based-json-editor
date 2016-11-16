import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";
import * as dragula from "dragula";

export class ArrayEditor extends React.Component<common.Props<common.ArraySchema, common.ValueType[]>, { value?: common.ValueType[]; collapsed?: boolean; renderSwitch?: number }> {
    private renderSwitch = 1;
    private collapsed = false;
    private value?: common.ValueType[];
    private drak: dragula.Drake;
    private errorMessage: string;
    private invalidIndexes: number[] = [];
    constructor(props: common.Props<common.ArraySchema, common.ValueType[]>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as common.ValueType[];
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
        const container = ReactDOM.findDOMNode(this).childNodes[this.props.required ? 2 : 3] as HTMLElement;
        this.drak = dragula([container]);
        this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
            if (this.value) {
                common.switchItem(this.value, el, sibling);
                this.renderSwitch = -this.renderSwitch;
                this.setState({ value: this.value, renderSwitch: this.renderSwitch });
                this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
            }
        });
    }
    componentWillUnmount() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    render() {
        let childrenElement: JSX.Element | null = null;
        if (this.value !== undefined && !this.collapsed) {
            const itemElements: JSX.Element[] = [];
            for (let i = 0; i < this.value.length; i++) {
                const onChange = (value: common.ValueType, isValid: boolean) => {
                    this.value![i] = value;
                    this.setState({ value: this.value });
                    this.validate();
                    common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
                    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
                };
                const onDelete = () => {
                    this.value!.splice(i, 1);
                    this.renderSwitch = -this.renderSwitch;
                    this.setState({ value: this.value, renderSwitch: this.renderSwitch });
                    this.validate();
                    this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
                };
                const key = (1 + i) * this.renderSwitch;
                itemElements.push((
                    <div key={key} data-index={i} className={this.props.theme.rowContainer}>
                        <Editor schema={this.props.schema.items}
                            title={String(i)}
                            initialValue={this.value[i]}
                            updateValue={onChange}
                            theme={this.props.theme}
                            icon={this.props.icon}
                            locale={this.props.locale}
                            required={true}
                            readonly={this.props.readonly || this.props.schema.readonly}
                            onDelete={onDelete} />
                    </div>
                ));
            }
            childrenElement = (
                <div className={this.props.theme.rowContainer}>
                    {itemElements}
                </div>
            );
        } else {
            childrenElement = (
                <div className={this.props.theme.rowContainer}></div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = (
                <button className={this.props.theme.button} onClick={this.props.onDelete}>
                    <Icon icon={this.props.icon} text={this.props.icon.delete}></Icon>
                </button>
            );
        }
        let addButton: JSX.Element | null = null;
        if (!this.props.readonly && this.value !== undefined) {
            const addItem = () => {
                this.value!.push(common.getDefaultValue(true, this.props.schema.items, undefined) !);
                this.setState({ value: this.value });
                this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
            };
            addButton = (
                <button className={this.props.theme.button} onClick={addItem}>
                    <Icon icon={this.props.icon} text={this.props.icon.add}></Icon>
                </button>
            );
        }
        let optionalCheckbox: JSX.Element | null = null;
        if (!this.props.required) {
            optionalCheckbox = (
                <div className={this.props.theme.optionalCheckbox}>
                    <label>
                        <input type="checkbox" onChange={this.toggleOptional} checked={this.value === undefined} />
                        is undefined
                    </label>
                </div>
            );
        }
        let errorDescription: JSX.Element | null = null;
        if (this.errorMessage) {
            errorDescription = <p className={this.props.theme.help}>{this.errorMessage}</p>;
        }
        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <button className={this.props.theme.button} onClick={this.collapseOrExpand}>
                            <Icon icon={this.props.icon} text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}></Icon>
                        </button>
                        {addButton}
                        {deleteButton}
                    </div>
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {optionalCheckbox}
                {childrenElement}
                {errorDescription}
            </div>
        );
    }
    private collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    private toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as common.ValueType[] | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
    }
    private validate() {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.props.schema, this.props.locale);
    }
}
