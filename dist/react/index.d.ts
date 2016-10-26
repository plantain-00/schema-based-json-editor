/// <reference types="react" />
import * as React from "react";
import "tslib";
export declare type CommonSchema = {
    $schema?: string;
    title?: string;
    description?: string;
    default?: ValueType;
    readonly?: boolean;
};
export declare type ObjectSchema = CommonSchema & {
    type: "object";
    properties: {
        [name: string]: Schema;
    };
    required?: string[];
};
export declare type ArraySchema = CommonSchema & {
    type: "array";
    items: Schema;
    minItems?: number;
    uniqueItems?: boolean;
};
export declare type NumberSchema = CommonSchema & {
    type: "number" | "integer";
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    enum?: number[];
};
export declare type StringSchema = CommonSchema & {
    type: "string";
    format?: "color" | "date" | "datetime" | "datetime-local" | "time" | "month" | "email" | "uri" | "url" | "week" | "hostname" | "ipv4" | "ipv6";
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};
export declare type BooleanSchema = CommonSchema & {
    type: "boolean";
};
export declare type NullSchema = CommonSchema & {
    type: "null";
};
export declare type Schema = ObjectSchema | ArraySchema | NumberSchema | StringSchema | BooleanSchema | NullSchema;
export declare type Theme = {
    rowContainer: string;
    row: string;
    formControl: string;
    button: string;
    help: string;
    errorRow: string;
    label: string;
    optionalCheckbox: string;
    buttonGroup: string;
};
export declare const themes: {
    [name: string]: Theme;
};
export declare type Locale = {
    button: {
        collapse: string;
        expand: string;
        add: string;
        delete: string;
    };
    error: {
        minLength: string;
        maxLength: string;
        pattern: string;
        minimum: string;
        maximum: string;
        largerThan: string;
        smallerThan: string;
    };
};
export declare const defaultLocale: Locale;
export declare const locales: {
    [name: string]: Locale;
};
export declare type Icon = {
    collapse: string | JSX.Element;
    expand: string | JSX.Element;
    add: string | JSX.Element;
    delete: string | JSX.Element;
};
export declare const icons: {
    [name: string]: Icon;
};
export declare type ValueType = {
    [name: string]: any;
} | any[] | number | boolean | string | null;
export declare class JSONEditor extends React.Component<{
    schema: Schema;
    initialValue: ValueType;
    updateValue: (value?: ValueType) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
}, {}> {
    render(): JSX.Element | null;
}
