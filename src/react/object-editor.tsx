import * as React from "react";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";

export class ObjectEditor extends React.Component<common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>, { collapsed?: boolean; value?: { [name: string]: common.ValueType } }> {
    collapsed = false;
    value?: { [name: string]: common.ValueType };
    invalidProperties: string[] = [];
    errorMessage: string;
    properties: { name: string; value: common.Schema }[] = [];
    constructor(props: common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType };
        this.validate();
        if (!this.collapsed && this.value !== undefined) {
            for (const property in this.props.schema.properties) {
                const schema = this.props.schema.properties[property];
                const required = this.props.schema.required && this.props.schema.required.some(r => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
                this.properties.push({
                    name: property,
                    value: schema,
                });
            }
            this.properties = this.properties.sort(common.compare);
        }
    }
    componentDidMount() {
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
    render() {
        const childrenElement: JSX.Element[] = [];
        if (!this.collapsed && this.value !== undefined) {
            Object.keys(this.props.schema.properties).sort((a, b) => {
                if (this.props.schema.properties[a].propertyOrder === undefined
                    && this.props.schema.properties[b].propertyOrder === undefined) {
                    return 0;
                }
                if (this.props.schema.properties[a].propertyOrder === undefined) {
                    return -this.props.schema.properties[b].propertyOrder!;
                }
                if (this.props.schema.properties[b].propertyOrder === undefined) {
                    return this.props.schema.properties[a].propertyOrder!;
                }
                return this.props.schema.properties[a].propertyOrder! - this.props.schema.properties[b].propertyOrder;
            });
            for (const {name: property, value: schema} of this.properties) {
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

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <h3>
                    {this.titleToShow}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <Optional required={this.props.required}
                            value={this.value}
                            isReadOnly={this.isReadOnly}
                            theme={this.props.theme}
                            locale={this.props.locale}
                            toggleOptional={this.toggleOptional} />
                        <Icon valid={true}
                            onClick={this.collapseOrExpand}
                            text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                        <Icon valid={this.hasDeleteButtonFunction}
                            onClick={this.props.onDelete!}
                            text={this.props.icon.delete}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                    </div>
                </h3>
                <Description theme={this.props.theme} message={this.props.schema.description} />
                <div className={this.props.theme.rowContainer}>
                    {childrenElement}
                </div>
                <Description theme={this.props.theme} message={this.errorMessage} />
            </div >
        );
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
    onChange = (property: string, value: common.ValueType, isValid: boolean) => {
        this.value![property] = value;
        this.validate();
        this.setState({ value: this.value });
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.props.updateValue(this.value, !this.errorMessage && this.invalidProperties.length === 0);
    }
    isRequired(property: string) {
        return this.props.schema.required && this.props.schema.required.some(r => r === property);
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfObject(this.value, this.props.schema, this.props.locale);
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get titleToShow() {
        if (this.props.onDelete) {
            return common.getTitle(common.findTitle(this.value), this.props.title, this.props.schema.title);
        }
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
