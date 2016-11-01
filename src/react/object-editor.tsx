import * as React from "react";
import * as common from "../common";
import { Editor } from "./editor";

export class ObjectEditor extends React.Component<common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>, { collapsed?: boolean; value?: { [name: string]: common.ValueType } }> {
    collapsed = false;
    value?: { [name: string]: common.ValueType };
    constructor(props: common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType };
    }
    componentDidMount() {
        this.props.updateValue(this.value);
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType };
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    render() {
        let childrenElement: JSX.Element | null = null;
        if (!this.collapsed && this.value !== undefined) {
            const propertyElements: JSX.Element[] = [];
            for (const property in this.props.schema.properties) {
                const onChange = (value: common.ValueType) => {
                    this.value![property] = value;
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                const schema = this.props.schema.properties[property];
                const required = this.props.schema.required && this.props.schema.required.some(r => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
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
            deleteButton = <button className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>;
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
            <div>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <button className={this.props.theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon.expand : this.props.icon.collapse}</button>
                        {deleteButton}
                    </div>
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {optionalCheckbox}
                {childrenElement}
            </div >
        );
    }
}
