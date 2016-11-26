/// <reference types="react" />
/// <reference types="dragula" />
/// <reference types="highlight.js" />
import "tslib";
import * as toNumber from "lodash/toNumber";
import * as toInteger from "lodash/toInteger";
import * as debounce from "lodash/debounce";
export { toNumber, toInteger, debounce };
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
    format?: "textarea" | "color" | "date" | "datetime" | "datetime-local" | "time" | "month" | "email" | "uri" | "url" | "week" | "hostname" | "ipv4" | "ipv6" | "code" | "markdown";
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
    radiobox: string;
};
export declare const themes: {
    [name: string]: Theme;
};
export declare function getTheme(name: string | undefined | Theme): Theme;
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
        minItems: string;
        uniqueItems: string;
    };
};
export declare const defaultLocale: Locale;
export declare const locales: {
    [name: string]: Locale;
};
export declare function getLocale(name: string | undefined | Locale): Locale;
export declare type Icon = {
    isText: boolean;
    collapse: string;
    expand: string;
    add: string;
    delete: string;
};
export declare function getIcon(name: string | undefined | Icon, locale: Locale): Icon;
export declare type ValueType = {
    [name: string]: any;
} | any[] | number | boolean | string | null;
export declare function getDefaultValue(required: boolean | undefined, schema: Schema, initialValue: ValueType | undefined): ValueType | undefined;
export declare const buttonGroupStyle: React.CSSProperties;
export declare const buttonGroupStyleString: string;
import { hljs as hljsLib, React, dragula } from "./lib";
export interface Props<TSchema extends CommonSchema, TValue> {
    schema: TSchema;
    initialValue: TValue;
    title?: string;
    updateValue: (value: TValue | undefined, isValid: boolean) => void;
    theme: Theme;
    icon: Icon;
    locale: Locale;
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
    dragula?: typeof dragula;
    md?: any;
    hljs?: typeof hljsLib;
    forceHttps?: boolean;
}
export declare function isSame(value1: ValueType, value2: ValueType): boolean;
export declare function switchItem(value: any[], el: HTMLElement, sibling: HTMLElement | null): void;
export declare function getErrorMessageOfArray(value: any[] | undefined, schema: ArraySchema, locale: Locale): string;
export declare function getErrorMessageOfNumber(value: number | undefined, schema: NumberSchema, locale: Locale): string;
export declare function getErrorMessageOfString(value: string | undefined, schema: StringSchema, locale: Locale): string;
export declare function toggleOptional(value: ValueType | undefined, schema: Schema, initialValue: any): string | number | boolean | any[] | {
    [name: string]: any;
} | null | undefined;
export declare type ValidityValue<T> = {
    value: T;
    isValid: boolean;
};
export declare function recordInvalidPropertiesOfObject(invalidProperties: string[], isValid: boolean, property: string): void;
export declare function recordInvalidIndexesOfArray(invalidIndexes: number[], isValid: boolean, i: number): void;
export declare function isImageUrl(value?: string): boolean;
export declare function replaceProtocal(src: string): string;
export declare const imagePreviewStyleString: string;
export declare const imagePreviewStyle: React.CSSProperties;
export declare function initializeMarkdown(markdownit: any, hljs: typeof hljsLib | undefined, forceHttps: boolean | undefined): any;
