import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";

export class ArrayEditor extends React.Component<common.Props<common.ArraySchema, common.ValueType[]>, { value?: common.ValueType[]; collapsed?: boolean; renderSwitch?: number }> {
    renderSwitch = 1;
    collapsed = false;
    value?: common.ValueType[];
    drak: common.dragula.Drake;
    errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, common.ValueType[]>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as common.ValueType[];
        this.validate();
    }
    getDragulaContainer() {
        return ReactDOM.findDOMNode(this).childNodes[this.props.required ? 2 : 3] as Element;
    }
    componentDidMount() {
        this.props.updateValue(this.value);
        const container = this.getDragulaContainer();
        this.drak = common.dragula([container]);
        this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
            if (this.value) {
                const fromIndex = +el.dataset["index"];
                if (sibling) {
                    const toIndex = +sibling.dataset["index"];
                    this.value.splice(toIndex, 0, this.value[fromIndex]);
                    if (fromIndex > toIndex) {
                        this.value.splice(fromIndex + 1, 1);
                    } else {
                        this.value.splice(fromIndex, 1);
                    }
                } else {
                    this.value.push(this.value[fromIndex]);
                    this.value.splice(fromIndex, 1);
                }
                this.renderSwitch = -this.renderSwitch;
                this.setState({ value: this.value, renderSwitch: this.renderSwitch });
                this.props.updateValue(this.value);
            }
        });
    }
    componentWillUnmount() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed }, () => {
            const container = this.getDragulaContainer();
            this.drak.containers = [container];
        });
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.props.schema, this.props.initialValue) as common.ValueType[];
        } else {
            this.value = undefined;
        }
        this.validate();
        this.setState({ value: this.value }, () => {
            const container = this.getDragulaContainer();
            this.drak.containers = [container];
        });
        this.props.updateValue(this.value);
    }
    validate() {
        if (this.value !== undefined) {
            if (this.props.schema.minItems !== undefined) {
                if (this.value.length < this.props.schema.minItems) {
                    this.errorMessage = this.props.locale.error.minItems.replace("{0}", String(this.props.schema.minItems));
                    return;
                }
            }
            if (this.props.schema.uniqueItems) {
                for (let i = 1; i < this.value.length; i++) {
                    for (let j = 0; j < i; j++) {
                        if (common.isSame(this.value[i], this.value[j])) {
                            this.errorMessage = this.props.locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                            return;
                        }
                    }
                }
            }
        }

        this.errorMessage = "";
    }
    render() {
        let childrenElement: JSX.Element | null = null;
        if (this.value !== undefined && !this.collapsed) {
            const itemElements: JSX.Element[] = [];
            for (let i = 0; i < this.value.length; i++) {
                const onChange = (value: common.ValueType) => {
                    this.value![i] = value;
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                    this.validate();
                };
                const onDelete = () => {
                    this.value!.splice(i, 1);
                    this.renderSwitch = -this.renderSwitch;
                    this.setState({ value: this.value, renderSwitch: this.renderSwitch });
                    this.props.updateValue(this.value);
                    this.validate();
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
                this.props.updateValue(this.value);
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
}
