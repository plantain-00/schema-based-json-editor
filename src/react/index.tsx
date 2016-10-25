import * as React from "react";
import "tslib";
declare const require: (name: string) => any;
const toNumber: (value?: any) => number = require("lodash.tonumber");
const toInteger: (value?: any) => number = require("lodash.tointeger");

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
    enum?: number[];
}

type StringSchema = CommonSchema & {
    type: "string";
    format?: "color";
    enum?: string[];
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
}

export const themes: { [name: string]: Theme } = {
    "bootstrap3": {
        rowContainer: "well well-small",
        row: "row",
        formControl: "form-control",
        button: "btn btn-default",
        help: "help-block",
    },
};

const defaultTheme = {
    rowContainer: "",
    row: "",
    formControl: "",
    button: "",
    help: "",
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
}

export const defaultLocale = {
    button: {
        collapse: "Collapse",
        expand: "Expand",
        add: "Add",
        delete: "Delete",
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

function getDefaultValue(schema: Schema): ValueType {
    let value: ValueType;
    if (schema.default !== undefined) {
        value = schema.default;
    } else {
        switch (schema.type) {
            case "object":
                value = {};
                break;
            case "array":
                value = [];
                break;
            case "number":
            case "integer":
                if (schema.enum !== undefined && schema.enum.length > 0) {
                    value = schema.enum[0];
                } else {
                    value = 0;
                }
                break;
            case "boolean":
                value = false;
                break;
            case "string":
                if (schema.enum !== undefined && schema.enum.length > 0) {
                    value = schema.enum[0];
                } else {
                    value = "";
                }
                break;
            case "null":
            default:
                value = null;
        }
    }
    return value;
}

class TitleEditor extends React.Component<{ title: string | undefined; onDelete?: () => void; theme: Theme; icon: Icon; locale: Locale }, {}> {
    public render() {
        if (this.props.title) {
            let deleteButton: JSX.Element | null = null;
            if (this.props.onDelete) {
                deleteButton = <button className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>;
            }
            return (
                <label>
                    {this.props.title}
                    {deleteButton}
                </label>
            );
        } else {
            return null;
        }
    }
}

class DescriptionEditor extends React.Component<{ description: string | undefined; theme: Theme }, {}> {
    public render() {
        if (this.props.description) {
            return <p className={this.props.theme.help}>{this.props.description}</p>;
        } else {
            return null;
        }
    }
}

type ValueType = { [name: string]: any } | any[] | number | boolean | string | null

type Props<TSchema extends CommonSchema, TValue, TTheme, TLocale, TIcon> = {
    schema: TSchema;
    initialValue: TValue;
    title?: string;
    updateValue: (value: TValue) => void;
    theme?: TTheme;
    icon?: TIcon;
    locale?: TLocale;
    onDelete?: () => void;
    readonly?: boolean;
}

class ObjectEditor extends React.Component<Props<ObjectSchema, { [name: string]: ValueType }, Theme, Locale, Icon>, { collapsed?: boolean; value?: { [name: string]: ValueType } }> {
    public collapsed = false;
    public value: { [name: string]: ValueType };
    constructor(props: Props<ObjectSchema, { [name: string]: ValueType }, Theme, Locale, Icon>) {
        super(props);
        if (this.props.initialValue === undefined) {
            this.value = getDefaultValue(this.props.schema) as { [name: string]: ValueType };
        } else {
            this.value = this.props.initialValue;
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
    public render() {
        let childrenElement: JSX.Element | null = null;
        if (!this.collapsed) {
            const propertyElements: JSX.Element[] = [];
            for (const property in this.props.schema.properties) {
                const onChange = (value: ValueType) => {
                    this.value[property] = value;
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                const schema = this.props.schema.properties[property];
                let initialValue: { [name: string]: ValueType };
                if (this.props.initialValue === undefined) {
                    initialValue = getDefaultValue(schema) as { [name: string]: ValueType };
                    this.value[property] = initialValue;
                } else {
                    initialValue = this.value[property] as { [name: string]: ValueType };
                }
                propertyElements.push(<Editor key={property}
                    schema={schema}
                    title={schema.title || property}
                    initialValue={initialValue}
                    updateValue={onChange}
                    theme={this.props.theme}
                    icon={this.props.icon}
                    locale={this.props.locale}
                    readonly={this.props.readonly || this.props.schema.readonly} />);
            }
            childrenElement = (
                <div className={this.props.theme!.rowContainer}>
                    {propertyElements}
                </div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = <button className={this.props.theme!.button} onClick={this.props.onDelete}>{this.props.icon!.delete}</button>;
        }
        return (
            <div>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <button className={this.props.theme!.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon!.expand : this.props.icon!.collapse}</button>
                    {deleteButton}
                </h3>
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme!} />
                {childrenElement}
            </div >
        );
    }
}

class ArrayEditor extends React.Component<Props<ArraySchema, ValueType[], Theme, Locale, Icon>, { value?: ValueType[]; collapsed?: boolean }> {
    public collapsed = false;
    public value: ValueType[];
    constructor(props: Props<ArraySchema, ValueType[], Theme, Locale, Icon>) {
        super(props);
        if (this.props.initialValue === undefined) {
            this.value = getDefaultValue(this.props.schema) as ValueType[];
        } else {
            this.value = this.props.initialValue;
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
    public render() {
        let childrenElement: JSX.Element | null = null;
        if (!this.collapsed) {
            const itemElements: JSX.Element[] = [];
            for (let i = 0; i < this.value.length; i++) {
                const onChange = (value: ValueType) => {
                    this.value[i] = value;
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                const onDelete = () => {
                    this.value.splice(i, 1);
                    this.setState({ value: this.value });
                    this.props.updateValue(this.value);
                };
                itemElements.push((
                    <div key={i} className={this.props.theme!.rowContainer}>
                        <Editor schema={this.props.schema.items}
                            title={`[${i}]`}
                            initialValue={this.value[i]}
                            updateValue={onChange}
                            theme={this.props.theme}
                            icon={this.props.icon}
                            locale={this.props.locale}
                            readonly={this.props.readonly || this.props.schema.readonly}
                            onDelete={onDelete} />
                    </div>
                ));
            }
            childrenElement = (
                <div className={this.props.theme!.rowContainer}>
                    {itemElements}
                </div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = <button className={this.props.theme!.button} onClick={this.props.onDelete}>{this.props.icon!.delete}</button>;
        }
        let addButton: JSX.Element | null = null;
        if (!this.props.readonly) {
            const addItem = () => {
                this.value.push(getDefaultValue(this.props.schema.items));
                this.setState({ value: this.value });
                this.props.updateValue(this.value);
            };
            addButton = <button className={this.props.theme!.button} onClick={addItem}>{this.props.icon!.add}</button>;
        }
        return (
            <div>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <button className={this.props.theme!.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon!.expand : this.props.icon!.collapse}</button>
                    {addButton}
                    {deleteButton}
                </h3>
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme!} />
                {childrenElement}
            </div>
        );
    }
}

class NumberEditor extends React.Component<Props<NumberSchema, number, Theme, Locale, Icon>, {}> {
    public value: number;
    constructor(props: Props<ArraySchema, number, Theme, Locale, Icon>) {
        super(props);
        if (this.props.initialValue === undefined) {
            this.value = getDefaultValue(this.props.schema) as number;
        } else {
            this.value = this.props.initialValue;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        if (this.props.schema.type === "integer") {
            this.props.updateValue(toInteger(e.currentTarget.value));
        } else {
            this.props.updateValue(toNumber(e.currentTarget.value));
        }
    }
    public render() {
        let control: JSX.Element | null = null;
        if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
            control = (
                <input className={this.props.theme!.formControl}
                    type="number"
                    onChange={this.onChange}
                    defaultValue={String(this.value)}
                    readOnly={this.props.readonly || this.props.schema.readonly} />
            );
        } else {
            const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
            control = (
                <select className={this.props.theme!.formControl}
                    type="number"
                    onChange={this.onChange}
                    defaultValue={String(this.value)} >
                    {options}
                </select>
            );
        }
        return (
            <div className={this.props.theme!.row}>
                <TitleEditor title={this.props.title}
                    onDelete={this.props.onDelete}
                    theme={this.props.theme!}
                    icon={this.props.icon!}
                    locale={this.props.locale!} />
                {control}
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme!} />
            </div>
        );
    }
}

class BooleanEditor extends React.Component<Props<BooleanSchema, boolean, Theme, Locale, Icon>, {}> {
    public value: boolean;
    constructor(props: Props<ArraySchema, boolean, Theme, Locale, Icon>) {
        super(props);
        if (this.props.initialValue === undefined) {
            this.value = getDefaultValue(this.props.schema) as boolean;
        } else {
            this.value = this.props.initialValue;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.props.updateValue(e.currentTarget.checked);
    }
    public render() {
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = <button className={this.props.theme!.button} onClick={this.props.onDelete}>{this.props.icon!.delete}</button>;
        }
        return (
            <div className={this.props.theme!.row}>
                <label>
                    <input className={this.props.theme!.formControl}
                        type="checkbox"
                        onChange={this.onChange}
                        checked={this.value}
                        readOnly={this.props.readonly || this.props.schema.readonly} />
                    {this.props.title}
                    {deleteButton}
                </label>
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme!} />
            </div>
        );
    }
}

class NullEditor extends React.Component<Props<NullSchema, null, Theme, Locale, Icon>, {}> {
    public value: null;
    constructor(props: Props<ArraySchema, null, Theme, Locale, Icon>) {
        super(props);
        if (this.props.initialValue === undefined) {
            this.value = getDefaultValue(this.props.schema) as null;
        } else {
            this.value = this.props.initialValue;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.title}
                    onDelete={this.props.onDelete}
                    theme={this.props.theme!}
                    icon={this.props.icon!}
                    locale={this.props.locale!} />
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme!} />
            </div>
        );
    }
}

class StringEditor extends React.Component<Props<StringSchema, string, Theme, Locale, Icon>, {}> {
    public value: string;
    constructor(props: Props<ArraySchema, string, Theme, Locale, Icon>) {
        super(props);
        if (this.props.initialValue === undefined) {
            this.value = getDefaultValue(this.props.schema) as string;
        } else {
            this.value = this.props.initialValue;
        }
    }
    public componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(e.currentTarget.value);
    }
    public render() {
        const type = this.props.schema.format === "color" ? "color" : "text";
        let control: JSX.Element | null = null;
        if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
            control = (
                <input className={this.props.theme!.formControl}
                    type={type}
                    onChange={this.onChange}
                    defaultValue={this.value}
                    readOnly={this.props.readonly || this.props.schema.readonly} />
            );
        } else {
            const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
            control = (
                <select className={this.props.theme!.formControl}
                    type={type}
                    onChange={this.onChange}
                    defaultValue={this.value}>
                    {options}
                </select>
            );
        }
        return (
            <div className={this.props.theme!.row}>
                <TitleEditor title={this.props.title}
                    onDelete={this.props.onDelete}
                    theme={this.props.theme!}
                    icon={this.props.icon!}
                    locale={this.props.locale!} />
                {control}
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme!} />
            </div>
        );
    }
}

export class Editor extends React.Component<Props<Schema, ValueType, Theme | string, Locale | string, Icon | string>, {}> {
    public render() {
        const theme = getTheme(this.props.theme);
        const locale = getLocale(this.props.locale);
        const icon = getIcon(this.props.icon, locale);
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor {...this.props as Props<ObjectSchema, { [name: string]: ValueType }, Theme, Locale, Icon>}
                    theme={theme}
                    locale={locale}
                    icon={icon} />;
            case "array":
                return <ArrayEditor {...this.props as Props<ArraySchema, ValueType[], Theme, Locale, Icon>}
                    theme={theme}
                    locale={locale}
                    icon={icon} />;
            case "number":
            case "integer":
                return <NumberEditor  {...this.props as Props<NumberSchema, number, Theme, Locale, Icon>}
                    theme={theme}
                    locale={locale}
                    icon={icon} />;
            case "boolean":
                return <BooleanEditor  {...this.props as Props<BooleanSchema, boolean, Theme, Locale, Icon>}
                    theme={theme}
                    locale={locale}
                    icon={icon} />;
            case "null":
                return <NullEditor  {...this.props as Props<NullSchema, null, Theme, Locale, Icon>}
                    theme={theme}
                    locale={locale}
                    icon={icon} />;
            case "string":
                return <StringEditor {...this.props as Props<StringSchema, string, Theme, Locale, Icon>}
                    theme={theme}
                    locale={locale}
                    icon={icon} />;
            default:
                return null;
        }
    }
}
