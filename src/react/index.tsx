import * as React from "react";
import "tslib";
declare const require: (name: string) => any;
const toNumber: (value?: any) => number = require("lodash.tonumber");
const toInteger: (value?: any) => number = require("lodash.tointeger");

type CommonSchema = {
    $schema?: string;
    title?: string;
    description?: string;
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
    type: "number";
    minimum?: number;
    exclusiveMinimum?: boolean;
}

type IntegerSchema = CommonSchema & {
    type: "integer";
}

type StringSchema = CommonSchema & {
    type: "string";
}

type BooleanSchema = CommonSchema & {
    type: "boolean";
}

type NullSchema = CommonSchema & {
    type: "null";
}

type Schema = ObjectSchema | ArraySchema | NumberSchema | StringSchema | IntegerSchema | BooleanSchema | NullSchema;

function getTheme(name: string | undefined) {
    if (name === "bootstrap3") {
        return {
            rowContainer: "well well-small",
            row: "row",
            formControl: "form-control",
            button: "btn btn-default",
            help: "help-block",
        };
    }
    return {
        rowContainer: "",
        row: "",
        formControl: "",
        button: "",
        help: "",
    };
}

function getDefaultValue(schema: Schema): ValueType {
    switch (schema.type) {
        case "object":
            return {};
        case "array":
            return [];
        case "number":
            return 0;
        case "integer":
            return 0;
        case "boolean":
            return false;
        case "string":
            return "";
        case "null":
        default:
            return null;
    }
}

class TitleEditor extends React.Component<{ title: string | undefined; onDelete?: () => void; theme?: string }, {}> {
    public render() {
        if (this.props.title) {
            let deleteButton: JSX.Element | null = null;
            if (this.props.onDelete) {
                const theme = getTheme(this.props.theme);
                deleteButton = <button className={theme.button} onClick={this.props.onDelete}>delete</button>;
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

class DescriptionEditor extends React.Component<{ description: string | undefined; theme?: string }, {}> {
    public render() {
        if (this.props.description) {
            const theme = getTheme(this.props.theme);
            return <p className={theme.help}>{this.props.description}</p>;
        } else {
            return null;
        }
    }
}

type ValueType = { [name: string]: any } | any[] | number | boolean | string | null

type Props<T extends CommonSchema, V> = {
    schema: T;
    initialValue: V;
    title?: string;
    updateValue: (value: V) => void;
    theme?: string;
    onDelete?: () => void;
}

class ObjectEditor extends React.Component<Props<ObjectSchema, { [name: string]: ValueType }>, { collapsed: boolean }> {
    public collapsed = false;
    public collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    public render() {
        let childrenElement: JSX.Element | null = null;
        const theme = getTheme(this.props.theme);
        if (!this.collapsed) {
            const propertyElements: JSX.Element[] = [];
            for (const property in this.props.schema.properties) {
                const onChange = (value: ValueType) => {
                    this.props.initialValue[property] = value;
                    this.props.updateValue(this.props.initialValue);
                };
                const schema = this.props.schema.properties[property];
                propertyElements.push(<Editor key={property}
                    schema={schema}
                    title={schema.title || property}
                    initialValue={(this.props.initialValue || {})[property] || getDefaultValue(schema)}
                    updateValue={onChange}
                    theme={this.props.theme} />);
            }
            childrenElement = (
                <div className={theme.rowContainer}>
                    {propertyElements}
                </div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete) {
            deleteButton = <button className={theme.button} onClick={this.props.onDelete}>delete</button>;
        }
        return (
            <div>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <button className={theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? "expand" : "collapse"}</button>
                    {deleteButton}
                </h3>
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
                {childrenElement}
            </div >
        );
    }
}

class ArrayEditor extends React.Component<Props<ArraySchema, ValueType[]>, { value?: ValueType[]; collapsed?: boolean }> {
    public collapsed = false;
    public value: ValueType[] = this.props.initialValue || [];
    public collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
    public render() {
        const addItem = () => {
            this.value.push(getDefaultValue(this.props.schema.items));
            this.setState({ value: this.value });
            this.props.updateValue(this.value);
        };
        const theme = getTheme(this.props.theme);
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
                    <div key={i} className={theme.rowContainer}>
                        <Editor schema={this.props.schema.items}
                            title={`[${i}]`}
                            initialValue={this.value[i]}
                            updateValue={onChange}
                            theme={this.props.theme}
                            onDelete={onDelete} />
                    </div>
                ));
            }
            childrenElement = (
                <div className={theme.rowContainer}>
                    {itemElements}
                </div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete) {
            deleteButton = <button className={theme.button} onClick={this.props.onDelete}>delete</button>;
        }
        return (
            <div>
                <h3>
                    {this.props.title || this.props.schema.title}
                    <button className={theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? "expand" : "collapse"}</button>
                    <button className={theme.button} onClick={addItem}>add</button>
                    {deleteButton}
                </h3>
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
                {childrenElement}
            </div>
        );
    }
}

class NumberEditor extends React.Component<Props<NumberSchema, number>, {}> {
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(toNumber(e.currentTarget.value));
    }
    public render() {
        const theme = getTheme(this.props.theme);
        return (
            <div className={theme.row}>
                <TitleEditor title={this.props.title} onDelete={this.props.onDelete} theme={this.props.theme} />
                <input className={theme.formControl} type="number" onChange={this.onChange} defaultValue={String(this.props.initialValue || 0)} />
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
            </div>
        );
    }
}

class IntegerEditor extends React.Component<Props<IntegerSchema, number>, {}> {
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(toInteger(e.currentTarget.value));
    }
    public render() {
        const theme = getTheme(this.props.theme);
        return (
            <div className={theme.row}>
                <TitleEditor title={this.props.title} onDelete={this.props.onDelete} theme={this.props.theme} />
                <input className={theme.formControl} type="number" onChange={this.onChange} defaultValue={String(this.props.initialValue || 0)} />
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
            </div>
        );
    }
}

class BooleanEditor extends React.Component<Props<BooleanSchema, boolean>, {}> {
    public onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.props.updateValue(e.currentTarget.checked);
    }
    public render() {
        const theme = getTheme(this.props.theme);
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete) {
            deleteButton = <button className={theme.button} onClick={this.props.onDelete}>delete</button>;
        }
        return (
            <div className={theme.row}>
                <label>
                    <input className={theme.formControl} type="checkbox" onChange={this.onChange} checked={this.props.initialValue || false} />
                    {this.props.title}
                    {deleteButton}
                </label>
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
            </div>
        );
    }
}

class NullEditor extends React.Component<Props<NullSchema, null>, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.title} onDelete={this.props.onDelete} theme={this.props.theme} />
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
            </div>
        );
    }
}

class StringEditor extends React.Component<Props<StringSchema, string>, {}> {
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(e.currentTarget.value);
    }
    public render() {
        const theme = getTheme(this.props.theme);
        return (
            <div className={theme.row}>
                <TitleEditor title={this.props.title} onDelete={this.props.onDelete} theme={this.props.theme} />
                <input className={theme.formControl} type="text" onChange={this.onChange} defaultValue={this.props.initialValue || ""} />
                <DescriptionEditor description={this.props.schema.description} theme={this.props.theme} />
            </div>
        );
    }
}

export class Editor extends React.Component<Props<Schema, ValueType>, {}> {
    public render() {
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor {...this.props as Props<ObjectSchema, { [name: string]: ValueType }>} />;
            case "array":
                return <ArrayEditor {...this.props as Props<ArraySchema, ValueType[]>} />;
            case "number":
                return <NumberEditor  {...this.props as Props<NumberSchema, number>} />;
            case "integer":
                return <IntegerEditor  {...this.props as Props<IntegerSchema, number>} />;
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
