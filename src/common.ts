import "tslib";

declare const require: (name: string) => any;

export const toNumber: (value?: any) => number = require("lodash.tonumber");
export const toInteger: (value?: any) => number = require("lodash.tointeger");

import * as dragula from "dragula";
export { dragula };

export type CommonSchema = {
    $schema?: string;
    title?: string;
    description?: string;
    default?: ValueType;
    readonly?: boolean;
}

export type ObjectSchema = CommonSchema & {
    type: "object";
    properties: { [name: string]: Schema };
    required?: string[];
}

export type ArraySchema = CommonSchema & {
    type: "array";
    items: Schema;
    minItems?: number;
    uniqueItems?: boolean;
}

export type NumberSchema = CommonSchema & {
    type: "number" | "integer";
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    enum?: number[];
}

export type StringSchema = CommonSchema & {
    type: "string";
    format?: "textarea" | "color" | "date" | "datetime" | "datetime-local" | "time" | "month" | "email" | "uri" | "url" | "week" | "hostname" | "ipv4" | "ipv6";
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

export type BooleanSchema = CommonSchema & {
    type: "boolean";
}

export type NullSchema = CommonSchema & {
    type: "null";
}

export type Schema = ObjectSchema | ArraySchema | NumberSchema | StringSchema | BooleanSchema | NullSchema;

export type Theme = {
    rowContainer: string;
    row: string;
    formControl: string;
    button: string;
    help: string;
    errorRow: string;
    label: string;
    optionalCheckbox: string;
    buttonGroup: string;
}

export const themes: { [name: string]: Theme } = {
    "bootstrap3": {
        rowContainer: "well bootstrap3-row-container",
        row: "row",
        formControl: "form-control",
        button: "btn btn-default",
        help: "help-block",
        errorRow: "row has-error",
        label: "control-label",
        optionalCheckbox: "checkbox",
        buttonGroup: "btn-group",
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
    buttonGroup: "",
};

export function getTheme(name: string | undefined | Theme): Theme {
    if (name === undefined) {
        return defaultTheme;
    }
    if (typeof name === "string") {
        return themes[name] || defaultTheme;
    }
    return name;
}

export type Locale = {
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
        minItems: string;
        uniqueItems: string;
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
        minItems: "The length of the array must be >= {0}",
        uniqueItems: "The item in {0} and {1} must not be same.",
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
            minItems: "数组的长度要求 >= {0}。",
            uniqueItems: "{0} 和 {1} 的项不应该相同。",
        },
    },
};

export function getLocale(name: string | undefined | Locale): Locale {
    if (name === undefined) {
        return defaultLocale;
    }
    if (typeof name === "string") {
        return locales[name] || defaultLocale;
    }
    return name;
}

export type Icon = {
    collapse: string | JSX.Element;
    expand: string | JSX.Element;
    add: string | JSX.Element;
    delete: string | JSX.Element;
}

export type ValueType = { [name: string]: any } | any[] | number | boolean | string | null;

export function getDefaultValue(required: boolean | undefined, schema: Schema, initialValue: ValueType | undefined): ValueType | undefined {
    if (!required) {
        return undefined;
    }
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

export const buttonGroupStyle = { marginLeft: "10px" };
export const buttonGroupStyleString = "margin-left: 10px";

export interface Props<TSchema extends CommonSchema, TValue> {
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

export function isSame(value1: ValueType, value2: ValueType) {
    if (typeof value1 === "string"
        || typeof value1 === "number"
        || typeof value1 === "boolean"
        || value1 === null
        || value1 === undefined) {
        return value1 === value2;
    }
    if (typeof value2 === "string"
        || typeof value2 === "number"
        || typeof value2 === "boolean"
        || value2 === null
        || value2 === undefined) {
        return false;
    }
    if (Array.isArray(value1)) {
        if (Array.isArray(value2) && (value1 as ValueType[]).length === (value2 as ValueType[]).length) {
            for (let i = 0; i < (value1 as ValueType[]).length; i++) {
                if (!isSame((value1 as ValueType[]), (value2 as ValueType[]))) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    if (Array.isArray(value2)
        || Object.keys((value1 as { [name: string]: ValueType })).length !== Object.keys((value1 as { [name: string]: ValueType })).length) {
        return false;
    }
    for (const key in value1) {
        if (!isSame((value1 as { [name: string]: ValueType })[key], (value2 as { [name: string]: ValueType })[key])) {
            return false;
        }
    }
    return true;
}
