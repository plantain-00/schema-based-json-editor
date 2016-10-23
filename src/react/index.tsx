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

class TitleEditor extends React.Component<{ title: string | undefined }, {}> {
    public render() {
        if (this.props.title) {
            return <div>{this.props.title}</div>;
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

class ObjectEditor extends React.Component<{ schema: ObjectSchema; initialValue: any; keyName: string; updateValue: (value: any) => void }, {}> {
    public render() {
        const propertyElements: JSX.Element[] = [];
        for (const property in this.props.schema.properties) {
            const onChange = (value: any) => {
                this.props.initialValue[property] = value;
                this.props.updateValue(this.props.initialValue);
            };
            propertyElements.push(<Editor key={property} schema={this.props.schema.properties[property]} keyName={property} initialValue={(this.props.initialValue || {})[property]} updateValue={onChange} />);
        }
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.keyName} />
                <DescriptionEditor description={this.props.schema.description} />
                <div>
                    {propertyElements}
                </div>
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

class NumberEditor extends React.Component<{ schema: NumberSchema; initialValue: number; keyName: string; updateValue: (value: number) => void }, {}> {
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(toNumber(e.currentTarget.value));
    }
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.keyName} />
                <input type="number" onChange={this.onChange} defaultValue={String(this.props.initialValue || 0)} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class IntegerEditor extends React.Component<{ schema: IntegerSchema; initialValue: number; keyName: string; updateValue: (value: number) => void }, {}> {
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(toInteger(e.currentTarget.value));
    }
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.keyName} />
                <input type="number" onChange={this.onChange} defaultValue={String(this.props.initialValue || 0)} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class BooleanEditor extends React.Component<{ schema: BooleanSchema; initialValue: boolean; keyName: string; updateValue: (checked: boolean) => void }, {}> {
    public onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.props.updateValue(e.currentTarget.checked);
    }
    public render() {
        return (
            <div>
                <label>
                    <input type="checkbox" onChange={this.onChange} checked={this.props.initialValue || false} />
                    {this.props.schema.title || this.props.keyName}
                </label>
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class NullEditor extends React.Component<{ schema: NullSchema; keyName: string }, {}> {
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.keyName} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

class StringEditor extends React.Component<{ schema: StringSchema; initialValue: string; keyName: string; updateValue: (value: string) => void }, {}> {
    public onChange = (e: React.FormEvent<{ value: string }>) => {
        this.props.updateValue(e.currentTarget.value);
    }
    public render() {
        return (
            <div>
                <TitleEditor title={this.props.schema.title || this.props.keyName} />
                <input type="text" onChange={this.onChange} defaultValue={this.props.initialValue || ""} />
                <DescriptionEditor description={this.props.schema.description} />
            </div>
        );
    }
}

export class Editor extends React.Component<{ schema: Schema; initialValue?: any; keyName: string; updateValue: (value: any) => void }, {}> {
    public onChange = (value: any) => {
        this.props.updateValue(value);
    }
    public render() {
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor schema={this.props.schema} keyName={this.props.keyName} initialValue={this.props.initialValue} updateValue={this.onChange} />;
            case "array":
                return <ArrayEditor schema={this.props.schema} />;
            case "number":
                return <NumberEditor schema={this.props.schema} keyName={this.props.keyName} initialValue={this.props.initialValue} updateValue={this.onChange} />;
            case "integer":
                return <IntegerEditor schema={this.props.schema} keyName={this.props.keyName} initialValue={this.props.initialValue} updateValue={this.onChange} />;
            case "boolean":
                return <BooleanEditor schema={this.props.schema} keyName={this.props.keyName} initialValue={this.props.initialValue} updateValue={this.onChange} />;
            case "null":
                return <NullEditor schema={this.props.schema} keyName={this.props.keyName} />;
            case "string":
                return <StringEditor schema={this.props.schema} keyName={this.props.keyName} initialValue={this.props.initialValue} updateValue={this.onChange} />;
            default:
                return null;
        }
    }
}
