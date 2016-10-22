import * as React from "react";
import "tslib";
declare const require: (name: string) => any;
const isNumber: (value?: any) => number = require("lodash.isnumber");
const isInteger: (value?: any) => number = require("lodash.isinteger");
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

class TitleEditor extends React.Component<{ title: string | undefined }, {}> {
    public render() {
        if (this.props.title) {
            return <h2>{this.props.title}</h2>;
        } else {
            return null;
        }
    }
}

class DescriptionEditor extends React.Component<{ description: string | undefined }, {}> {
    public render() {
        if (this.props.description) {
            return <p>{this.props.description}</p>;
        } else {
            return null;
        }
    }
}

class ObjectEditor extends React.Component<{ schema: ObjectSchema }, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class ArrayEditor extends React.Component<{ schema: ArraySchema }, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class NumberEditor extends React.Component<{ schema: NumberSchema; initialValue: number; key: string; updateValue: (value: any) => void }, { value: number }> {
    public value = this.props.initialValue || 0;
    public onChange = (e: React.FormEvent<{ value: any }>) => {
        if (isNumber(e.currentTarget.value)) {
            this.value = e.currentTarget.value;
        } else {
            this.value = toNumber(e.currentTarget.value);
        }
        this.props.updateValue(this.value);
    }
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.key} />
                <input type="number" onChange={this.onChange} value={this.value} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class IntegerEditor extends React.Component<{ schema: IntegerSchema; initialValue: number; key: string; updateValue: (value: any) => void }, { value: number }> {
    public value = this.props.initialValue || 0;
    public onChange = (e: React.FormEvent<{ value: any }>) => {
        if (isInteger(e.currentTarget.value)) {
            this.value = e.currentTarget.value;
        } else {
            this.value = toInteger(e.currentTarget.value);
        }
        this.props.updateValue(this.value);
    }
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.key} />
                <input type="number" onChange={this.onChange} value={this.value} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class BooleanEditor extends React.Component<{ schema: BooleanSchema }, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class NullEditor extends React.Component<{ schema: NullSchema }, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class StringEditor extends React.Component<{ schema: StringSchema }, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

export class Editor extends React.Component<{ schema: Schema; initialValue?: any; }, { value: any }> {
    public value = this.props.initialValue;
    public render() {
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor schema={this.props.schema} />;
            case "array":
                return <ArrayEditor schema={this.props.schema} />;
            case "number":
                return <NumberEditor schema={this.props.schema} key="root" initialValue={this.props.initialValue} updateValue={(value) => this.setState({ value })} />;
            case "integer":
                return <IntegerEditor schema={this.props.schema} key="root" initialValue={this.props.initialValue} updateValue={(value) => this.setState({ value })} />;
            case "boolean":
                return <BooleanEditor schema={this.props.schema} />;
            case "null":
                return <NullEditor schema={this.props.schema} />;
            case "string":
                return <StringEditor schema={this.props.schema} />;
            default:
                return null;
        }
    }
}
