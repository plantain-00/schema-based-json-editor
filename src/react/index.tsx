import * as React from "react";
import * as ReactDOM from "react-dom";
import "tslib";
declare const require: (name: string) => any;
const toNumber: (value?: any) => number = require("lodash.tonumber");
const toInteger: (value?: any) => number = require("lodash.tointeger");
import * as dragula from "dragula";

type CommonSchema = {
    $schema?: string;
    title?: string;
    description?: string;
    default?: ValueType;
    readonly?: boolean;
}

type ObjectSchema = CommonSchema & {
    type: "object";
    properties: { [name: string]: Schema };
    required?: string[];
}

type ArraySchema = CommonSchema & {
    type: "array";
    items: Schema;
    minItems?: number;
    uniqueItems?: boolean;
}

type NumberSchema = CommonSchema & {
    type: "number" | "integer";
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    enum?: number[];
}

type StringSchema = CommonSchema & {
    type: "string";
    format?: "color" | "date" | "datetime" | "datetime-local" | "time" | "month" | "email" | "uri" | "url" | "week" | "hostname" | "ipv4" | "ipv6";
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

type BooleanSchema = CommonSchema & {
    type: "boolean";
}

type NullSchema = CommonSchema & {
    type: "null";
}

type Schema = ObjectSchema | ArraySchema | NumberSchema | StringSchema | BooleanSchema | NullSchema;

type Theme = {
    rowContainer: string;
    row: string;
    formControl: string;
    button: string;
    help: string;
    errorRow: string;
    label: string;
    optionalCheckbox: string;
}

export const themes: { [name: string]: Theme } = {
    "bootstrap3": {
        rowContainer: "well well-small",
        row: "row",
        formControl: "form-control",
        button: "btn btn-default",
        help: "help-block",
        errorRow: "row has-error",
        label: "control-label",
        optionalCheckbox: "checkbox",
    },
};

const defaultTheme: Theme = {
    rowContainer: "",
    row: "",
    formControl: "",
    button: "",
    help: "",
    errorRow: "",
    label: "",
    optionalCheckbox: "",
};

function getTheme(name: string | undefined | Theme): Theme {
    if (name === undefined) {
        return defaultTheme;
    }
    if (typeof name === "string") {
        return themes[name] || defaultTheme;
    }
    return name;
}

type Locale = {
    button: {
        collapse: string;
        expand: string;
        add: string;
        delete: string;
    },
    error: {
        minLength: string;
        maxLength: string;
        pattern: string;
        minimum: string;
        maximum: string;
        largerThan: string;
        smallerThan: string;
    },
}

export const defaultLocale: Locale = {
    button: {
        collapse: "Collapse",
        expand: "Expand",
        add: "Add",
        delete: "Delete",
    },
    error: {
        minLength: "Value must be at least {0} characters long.",
        maxLength: "Value must be at most {0} characters long.",
        pattern: "Value doesn't match the pattern {0}.",
        minimum: "Value must be >= {0}.",
        maximum: "Value must be <= {0}.",
        largerThan: "Value must be > {0}.",
        smallerThan: "Value must be < {0}.",
    },
};

export const locales: { [name: string]: Locale } = {
    "zh-cn": {
        button: {
            collapse: "折叠",
            expand: "显示",
            add: "增加",
            delete: "删除",
        },
        error: {
            minLength: "要求至少 {0} 字符。",
            maxLength: "要求至多 {0} 字符。",
            pattern: "要求匹配模式 {0}。",
            minimum: "要求 >= {0}。",
            maximum: "要求 <= {0}。",
            largerThan: "要求 > {0}。",
            smallerThan: "要求 < {0}。",
        },
    },
};

function getLocale(name: string | undefined | Locale): Locale {
    if (name === undefined) {
        return defaultLocale;
    }
    if (typeof name === "string") {
        return locales[name] || defaultLocale;
    }
    return name;
}

type Icon = {
    collapse: string | JSX.Element;
    expand: string | JSX.Element;
    add: string | JSX.Element;
    delete: string | JSX.Element;
}

export const icons: { [name: string]: Icon } = {
    "bootstrap3": {
        collapse: <i className="glyphicon glyphicon-chevron-down"></i> as string | JSX.Element,
        expand: <i className="glyphicon glyphicon-chevron-right"></i> as string | JSX.Element,
        add: <i className="glyphicon glyphicon-plus"></i> as string | JSX.Element,
        delete: <i className="glyphicon glyphicon-remove"></i> as string | JSX.Element,
    },
    "fontawesome4": {
        collapse: <i className="fa fa-caret-square-o-down"></i> as string | JSX.Element,
        expand: <i className="fa fa-caret-square-o-right"></i> as string | JSX.Element,
        add: <i className="fa fa-plus"></i> as string | JSX.Element,
        delete: <i className="fa fa-times"></i> as string | JSX.Element,
    },
};

function getIcon(name: string | undefined | Icon, locale: Locale): Icon {
    if (name === undefined) {
        return {
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    if (typeof name === "string") {

        return icons[name] || {
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    return name;
}

function getDefaultValue(schema: Schema, initialValue: ValueType | undefined): ValueType {
    if (initialValue !== undefined) {
        return initialValue;
    }
    if (schema.default !== undefined) {
        return schema.default;
    }
    switch (schema.type) {
        case "object":
            return {};
        case "array":
            return [];
        case "number":
        case "integer":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            } else {
                return 0;
            }
        case "boolean":
            return false;
        case "string":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            } else {
                return "";
            }
        case "null":
        default:
            return null;
    }
}

class TitleEditor extends React.Component<{ title: string | undefined; onDelete?: () => void; theme: Theme; icon: Icon; locale: Locale }, {}> {
    public render() {
        if (this.props.title) {
            let deleteButton: JSX.Element | null = null;
            if (this.props.onDelete) {
                deleteButton = <button className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>;
            }
            return (
                <label className={this.props.theme.label}>
                    {this.props.title}
                    {deleteButton}
                </label>
            );
        } else {
            return null;
        }
    }
}

type ValueType = { [name: string]: any } | any[] | number | boolean | string | null

type Props<TSchema extends CommonSchema, TValue> = {
    schema: TSchema;
    initialValue: TValue;
    title?: string;
    updateValue: (value?: TValue) => void;
    theme: Theme;
    icon: Icon;
    locale: Locale;
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
}

class ObjectEditor extends React.Component<Props<ObjectSchema, { [name: string]: ValueType }>, { collapsed?: boolean; value?: { [name: string]: ValueType } }> {
    public collapsed = false;
    public value?: { [name: string]: ValueType };
    constructor(props: Props<ObjectSchema, { [name: string]: ValueType }>) {
        super(props);
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as { [name: string]: ValueType };
        } else {
            this.value = undefined;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    public toggleOptional = () => {
        if (this.value === undefined) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as { [name: string]: ValueType };
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    public render() {
        let childrenElement: JSX.Element | null = null;
        if (!this.collapsed && this.value !== undefined) {
            const propertyElements: JSX.Element[] = [];
            for (const property in this.props.schema.properties) {
                const onChange = (value: ValueType) => {
                    this.value![property] = value;
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                const schema = this.props.schema.properties[property];
                this.value[property] = getDefaultValue(schema, this.value[property]) as { [name: string]: ValueType };
                propertyElements.push(<Editor key={property}
                    schema={schema}
                    title={schema.title || property}
                    initialValue={this.value[property]}
                    updateValue={onChange}
                    theme={this.props.theme}
                    icon={this.props.icon}
                    locale={this.props.locale}
                    required={this.props.schema.required && this.props.schema.required.some(r => r === property)}
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
                    <button className={this.props.theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon.expand : this.props.icon.collapse}</button>
                    {deleteButton}
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {optionalCheckbox}
                {childrenElement}
            </div >
        );
    }
}

class ArrayEditor extends React.Component<Props<ArraySchema, ValueType[]>, { value?: ValueType[]; collapsed?: boolean }> {
    public collapsed = false;
    public value?: ValueType[];
    public drak: dragula.Drake;
    constructor(props: Props<ArraySchema, ValueType[]>) {
        super(props);
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as ValueType[];
        } else {
            this.value = undefined;
        }
    }
    public getDragulaContainer() {
        return ReactDOM.findDOMNode(this).childNodes[2] as Element;
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
        const container = this.getDragulaContainer();
        this.drak = dragula([container]);
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
                this.setState({ value: this.value });
                this.props.updateValue(this.value);
            }
        });
    }
    public componentWillUnmount() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    public collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed }, () => {
            const container = this.getDragulaContainer();
            this.drak.containers = [container];
        });
    }
    public toggleOptional = () => {
        if (this.value === undefined) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as ValueType[];
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value }, () => {
            const container = this.getDragulaContainer();
            this.drak.containers = [container];
        });
        this.props.updateValue(this.value);
    }
    public render() {
        let childrenElement: JSX.Element | null = null;
        if (this.value !== undefined && !this.collapsed) {
            const itemElements: JSX.Element[] = [];
            for (let i = 0; i < this.value.length; i++) {
                const onChange = (value: ValueType) => {
                    this.value![i] = value;
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                const onDelete = () => {
                    this.value!.splice(i, 1);
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                itemElements.push((
                    <div key={i} data-index={i} className={this.props.theme.rowContainer}>
                        <Editor schema={this.props.schema.items}
                            title={`[${i}]`}
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
            deleteButton = <button className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>;
        }
        let addButton: JSX.Element | null = null;
        if (!this.props.readonly && this.value !== undefined) {
            const addItem = () => {
                this.value!.push(getDefaultValue(this.props.schema.items, undefined));
                this.setState({ value: this.value });
                this.props.updateValue(this.value);
            };
            addButton = <button className={this.props.theme.button} onClick={addItem}>{this.props.icon.add}</button>;
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
                    <button className={this.props.theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon.expand : this.props.icon.collapse}</button>
                    {addButton}
                    {deleteButton}
                </h3>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {optionalCheckbox}
                {childrenElement}
            </div>
        );
    }
}

class NumberEditor extends React.Component<Props<NumberSchema, number>, {}> {
    public value?: number;
    public errorMessage: string;
    constructor(props: Props<ArraySchema, number>) {
        super(props);
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as number;
        } else {
            this.value = undefined;
        }
        this.validate();
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = this.props.schema.type === "integer" ? toInteger(e.currentTarget.value) : toNumber(e.currentTarget.value);
        this.validate();
        this.props.updateValue(this.value);
    }
    public validate() {
        if (this.value !== undefined) {
            if (this.props.schema.minimum !== undefined) {
                if (this.props.schema.exclusiveMinimum) {
                    if (this.value <= this.props.schema.minimum) {
                        this.errorMessage = this.props.locale.error.largerThan.replace("{0}", String(this.props.schema.minimum));
                        return;
                    }
                } else {
                    if (this.value < this.props.schema.minimum) {
                        this.errorMessage = this.props.locale.error.minimum.replace("{0}", String(this.props.schema.minimum));
                        return;
                    }
                }
            }
            if (this.props.schema.maximum !== undefined) {
                if (this.props.schema.exclusiveMaximum) {
                    if (this.value >= this.props.schema.maximum) {
                        this.errorMessage = this.props.locale.error.smallerThan.replace("{0}", String(this.props.schema.maximum));
                        return;
                    }
                } else {
                    if (this.value > this.props.schema.maximum) {
                        this.errorMessage = this.props.locale.error.maximum.replace("{0}", String(this.props.schema.maximum));
                        return;
                    }
                }
            }
        }

        this.errorMessage = "";
    }
    public toggleOptional = () => {
        if (this.value === undefined) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as number;
            this.validate();
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    public render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                control = (
                    <input className={this.props.theme.formControl}
                        type="number"
                        onChange={this.onChange}
                        defaultValue={String(this.value)}
                        readOnly={this.props.readonly || this.props.schema.readonly} />
                );
            } else {
                const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
                control = (
                    <select className={this.props.theme.formControl}
                        type="number"
                        onChange={this.onChange}
                        defaultValue={String(this.value)} >
                        {options}
                    </select>
                );
            }
        }
        let errorDescription: JSX.Element | null = null;
        if (this.errorMessage) {
            errorDescription = <p className={this.errorMessage}>{this.props.schema.description}</p>;
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
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                {control}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {errorDescription}
            </div>
        );
    }
}

class BooleanEditor extends React.Component<Props<BooleanSchema, boolean>, {}> {
    public value?: boolean;
    constructor(props: Props<ArraySchema, boolean>) {
        super(props);
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as boolean;
        } else {
            this.value = undefined;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.value = e.currentTarget.checked;
        this.props.updateValue(this.value);
    }
    public toggleOptional = () => {
        if (this.value === undefined) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue === undefined) as boolean;
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    public render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            let deleteButton: JSX.Element | null = null;
            if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
                deleteButton = <button className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>;
            }
            control = (
                <div className={this.props.theme.optionalCheckbox}>
                    <label>
                        <input type="checkbox"
                            onChange={this.onChange}
                            checked={this.value}
                            readOnly={this.props.readonly || this.props.schema.readonly} />
                        {this.props.title}
                    </label>
                </div>
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
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                {control}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
}

class NullEditor extends React.Component<Props<NullSchema, null>, {}> {
    public value?: null;
    constructor(props: Props<ArraySchema, null>) {
        super(props);
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as null;
        } else {
            this.value = undefined;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public toggleOptional = () => {
        if (this.value === undefined) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as null;
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    public render() {
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
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
}

class StringEditor extends React.Component<Props<StringSchema, string>, {}> {
    public value?: string;
    public errorMessage: string;
    constructor(props: Props<ArraySchema, string>) {
        super(props);
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as string;
        } else {
            this.value = undefined;
        }
        this.validate();
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = e.currentTarget.value;
        this.validate();
        this.props.updateValue(this.value);
    }
    public validate() {
        if (this.value !== undefined) {
            if (this.props.schema.minLength !== undefined
                && this.value.length < this.props.schema.minLength) {
                this.errorMessage = this.props.locale.error.minLength.replace("{0}", String(this.props.schema.minLength));
                return;
            }
            if (this.props.schema.maxLength !== undefined
                && this.value.length > this.props.schema.maxLength) {
                this.errorMessage = this.props.locale.error.maxLength.replace("{0}", String(this.props.schema.maxLength));
                return;
            }
            if (this.props.schema.pattern !== undefined
                && !this.value.match(this.props.schema.pattern)) {
                this.errorMessage = this.props.locale.error.pattern.replace("{0}", String(this.props.schema.pattern));
                return;
            }
        }

        this.errorMessage = "";
    }
    public toggleOptional = () => {
        if (this.value === undefined) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue) as string;
            this.validate();
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    public render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                control = (
                    <input className={this.props.theme.formControl}
                        type={this.props.schema.format}
                        onChange={this.onChange}
                        defaultValue={this.value}
                        readOnly={this.props.readonly || this.props.schema.readonly} />
                );
            } else {
                const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
                control = (
                    <select className={this.props.theme.formControl}
                        type={this.props.schema.format}
                        onChange={this.onChange}
                        defaultValue={this.value}>
                        {options}
                    </select>
                );
            }
        }

        let errorDescription: JSX.Element | null = null;
        if (this.errorMessage) {
            errorDescription = <p className={this.errorMessage}>{this.props.schema.description}</p>;
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
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                {control}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {errorDescription}
            </div>
        );
    }
}

class Editor extends React.Component<Props<Schema, ValueType>, {}> {
    public render() {
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor {...this.props as Props<ObjectSchema, { [name: string]: ValueType }>} />;
            case "array":
                return <ArrayEditor {...this.props as Props<ArraySchema, ValueType[]>} />;
            case "number":
            case "integer":
                return <NumberEditor  {...this.props as Props<NumberSchema, number>} />;
            case "boolean":
                return <BooleanEditor  {...this.props as Props<BooleanSchema, boolean>} />;
            case "null":
                return <NullEditor  {...this.props as Props<NullSchema, null>} />;
            case "string":
                return <StringEditor {...this.props as Props<StringSchema, string>} />;
            default:
                return null;
        }
    }
}

export class JSONEditor extends React.Component<{
    schema: Schema;
    initialValue: ValueType;
    title?: string;
    updateValue: (value?: ValueType) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    onDelete?: () => void;
    readonly?: boolean;
}, {}> {
    public render() {
        const theme = getTheme(this.props.theme);
        const locale = getLocale(this.props.locale);
        const icon = getIcon(this.props.icon, locale);
        const props = {
            title: this.props.title,
            updateValue: this.props.updateValue,
            onDelete: this.props.onDelete,
            readonly: this.props.readonly,
            theme,
            locale,
            icon,
            required: true,
        };
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as { [name: string]: ValueType }}
                    {...props} />;
            case "array":
                return <ArrayEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as ValueType[]}
                    {...props} />;
            case "number":
            case "integer":
                return <NumberEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as number}
                    {...props} />;
            case "boolean":
                return <BooleanEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as boolean}
                    {...props} />;
            case "null":
                return <NullEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as null}
                    {...props} />;
            case "string":
                return <StringEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as string}
                    {...props} />;
            default:
                return null;
        }
    }
}
