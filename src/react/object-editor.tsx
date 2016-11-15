import * as React from "react";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";

export class ObjectEditor extends React.Component<common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>, { collapsed?: boolean; value?: { [name: string]: common.ValueType } }> {
    private collapsed = false;
    private value?: { [name: string]: common.ValueType };
    private invalidProperties: string[] = [];
    constructor(props: common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType };
        if (!this.collapsed && this.value !== undefined) {
            for (const property in this.props.schema.properties) {
                const schema = this.props.schema.properties[property];
                const required = this.props.schema.required && this.props.schema.required.some(r => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
            }
        }
    }
    componentDidMount() {
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
    render() {
        let childrenElement: JSX.Element | null = null;
        if (!this.collapsed && this.value !== undefined) {
            const propertyElements: JSX.Element[] = [];
            for (const property in this.props.schema.properties) {
                const onChange = (value: common.ValueType, isValid: boolean) => {
                    this.value![property] = value;
                    this.setState({ value: this.value });
                    common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
                    this.props.updateValue(this.value, this.invalidProperties.length === 0);
                };
                const schema = this.props.schema.properties[property];
                const required = this.props.schema.required && this.props.schema.required.some(r => r === property);
                propertyElements.push(<Editor key={property}
                    schema={schema}
                    title={schema.title || property}
                    initialValue={this.value[property]}
                    updateValue={onChange}
                    theme={this.props.theme}
                    icon={this.props.icon}
                    locale={this.props.locale}
                    required={required}
                    readonly={this.props.readonly || this.props.schema.readonly} />);
            }
            childrenElement = (
                <div className={this.props.theme.rowContainer}>
                    {propertyElements}
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
        return (
            <div className={this.props.theme.row}>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <button className={this.props.theme.button} onClick={this.collapseOrExpand}>
                            <Icon icon={this.props.icon} text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}></Icon>
                        </button>
                        {deleteButton}
                    </div>
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {optionalCheckbox}
                {childrenElement}
            </div >
        );
    }
    private collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    private toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
}
