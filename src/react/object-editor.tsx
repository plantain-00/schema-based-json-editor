import * as React from "react";
import * as common from "../common";
import { Editor } from "./editor";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";

export type Props = common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>;
export type State = Partial<{
    collapsed?: boolean;
    value?: { [name: string]: common.ValueType };
    invalidProperties: string[];
    errorMessage: string;
    properties: { property: string; schema: common.Schema }[];
    filter: string;
    locked: boolean;
}>;

export class ObjectEditor extends React.Component<Props, State> {
    collapsed = this.props.schema.collapsed;
    value?: { [name: string]: common.ValueType };
    invalidProperties: string[] = [];
    errorMessage: string;
    properties: { property: string; schema: common.Schema }[] = [];
    filter: string = "";
    locked = true;
    constructor(props: Props) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as { [name: string]: common.ValueType };
        this.validate();
        if (this.value !== undefined) {
            for (const property in this.props.schema.properties) {
                const schema = this.props.schema.properties[property];
                const required = this.props.schema.required && this.props.schema.required.some(r => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
                this.properties.push({
                    property,
                    schema,
                });
            }
            this.properties = this.properties.sort(common.compare);
        }
    }
    componentDidMount() {
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    }
    render() {
        const childrenElement: JSX.Element[] = (!this.collapsed && this.value !== undefined)
            ? this.properties.filter(p => common.filterObject(p, this.filter))
                .map(({ property, schema }) => <Editor key={property}
                    schema={schema}
                    title={schema.title || property}
                    initialValue={this.value![property]}
                    updateValue={(value: common.ValueType, isValid: boolean) => this.onChange(property, value, isValid)}
                    theme={this.props.theme}
                    icon={this.props.icon}
                    locale={this.props.locale}
                    required={this.isRequired(property)}
                    readonly={this.isReadOnly}
                    dragula={this.props.dragula}
                    md={this.props.md}
                    hljs={this.props.hljs}
                    forceHttps={this.props.forceHttps}
                    parentIsLocked={this.isLocked} />)
            : [];
        const filterElement: JSX.Element | null = (!this.collapsed && this.value !== undefined && this.showFilter)
            ? <div className={this.props.theme.row}><input className={this.props.theme.formControl}
                onChange={this.onFilterChange}
                defaultValue={this.filter} /></div>
            : null;

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <h3>
                    {this.titleToShow}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <Icon valid={!this.isReadOnly}
                            onClick={this.toggleLocked}
                            text={this.locked ? this.props.icon.unlock : this.props.icon.lock}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                        <Optional required={this.props.required}
                            value={this.value}
                            isReadOnly={this.isReadOnly || this.isLocked}
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
                    {filterElement}
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
    toggleLocked = () => {
        this.locked = !this.locked;
        this.setState({ locked: this.locked });
    }
    onFilterChange = (e: React.FormEvent<{ value: string }>) => {
        this.filter = e.currentTarget.value;
        this.setState({ filter: this.filter });
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
    get isLocked() {
        return this.props.parentIsLocked !== false && this.locked;
    }
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly && !this.locked;
    }
    get titleToShow() {
        if (this.props.onDelete) {
            return common.getTitle(common.findTitle(this.value, this.properties), this.props.title, this.props.schema.title);
        }
        return common.getTitle(this.props.title, this.props.schema.title);
    }
    get showFilter() {
        return this.properties.length >= common.minItemCountIfNeedFilter;
    }
}
