import * as React from "react";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";

export class ObjectEditor extends React.Component<common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>, { collapsed?: boolean; value?: { [name: string]: common.ValueType } }> {
    collapsed = false;
    value?: { [name: string]: common.ValueType };
    invalidProperties: string[] = [];
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
        const childrenElement: JSX.Element[] = [];
        if (!this.collapsed && this.value !== undefined) {
            for (const property in this.props.schema.properties) {
                const schema = this.props.schema.properties[property];
                childrenElement.push(<Editor key={property}
                    schema={schema}
                    title={schema.title || property}
                    initialValue={this.value[property]}
                    updateValue={(value: common.ValueType, isValid: boolean) => this.onChange(property, value, isValid)}
                    theme={this.props.theme}
                    icon={this.props.icon}
                    locale={this.props.locale}
                    required={this.isRequired(property)}
                    readonly={this.isReadOnly}
                    dragula={this.props.dragula}
                    md={this.props.md}
                    hljs={this.props.hljs}
                    forceHttps={this.props.forceHttps} />);
            }
        }

        const deleteButton = this.hasDeleteButtonFunction ? (
            <button className={this.props.theme.button} onClick={this.props.onDelete}>
                <Icon icon={this.props.icon} text={this.props.icon.delete}></Icon>
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

        return (
            <div className={this.props.theme.row}>
                <h3>
                    {this.titleToShow}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        {optionalCheckbox}
                        <button className={this.props.theme.button} onClick={this.collapseOrExpand}>
                            <Icon icon={this.props.icon} text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}></Icon>
                        </button>
                        {deleteButton}
                    </div>
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                <div className={this.props.theme.rowContainer}>
                    {childrenElement}
                </div>
            </div >
        );
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
    onChange = (property: string, value: common.ValueType, isValid: boolean) => {
        this.value![property] = value;
        this.setState({ value: this.value });
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
    isRequired(property: string) {
        return this.props.schema.required && this.props.schema.required.some(r => r === property);
    }
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get hasOptionalCheckbox() {
        return !this.props.required && (this.value === undefined || !this.isReadOnly);
    }
    get titleToShow() {
        if (this.props.onDelete) {
            return common.getTitle(common.findTitle(this.value), this.props.title, this.props.schema.title);
        }
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
