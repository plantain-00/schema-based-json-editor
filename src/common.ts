import "tslib";

import * as toNumber from "lodash/toNumber";
import * as toInteger from "lodash/toInteger";
import * as debounce from "lodash/debounce";
import * as isObject from "lodash/isObject";

export { toNumber, toInteger, debounce };

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
    isText: boolean;
    collapse: string;
    expand: string;
    add: string;
    delete: string;
}

const icons: { [name: string]: Icon } = {
    "bootstrap3": {
        isText: false,
        collapse: "glyphicon glyphicon-chevron-down",
        expand: "glyphicon glyphicon-chevron-right",
        add: "glyphicon glyphicon-plus",
        delete: "glyphicon glyphicon-remove",
    },
    "fontawesome4": {
        isText: false,
        collapse: "fa fa-caret-square-o-down",
        expand: "fa fa-caret-square-o-right",
        add: "fa fa-plus",
        delete: "fa fa-times",
    },
};

export function getIcon(name: string | undefined | Icon, locale: Locale): Icon {
    if (name === undefined) {
        return {
            isText: true,
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    if (typeof name === "string") {
        return icons[name] || {
            isText: true,
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    return name;
}

export type ValueType = { [name: string]: any } | any[] | number | boolean | string | null;

export function getDefaultValue(required: boolean | undefined, schema: Schema, initialValue: ValueType | undefined): ValueType | undefined {
    if (initialValue !== undefined) {
        switch (schema.type) {
            case "object":
                if (isObject(initialValue)) {
                    return initialValue;
                }
                break;
            case "array":
                if (Array.isArray(initialValue)) {
                    return initialValue;
                }
                break;
            case "number":
            case "integer":
                if (typeof initialValue === "number") {
                    return initialValue;
                }
                break;
            case "boolean":
                if (typeof initialValue === "boolean") {
                    return initialValue;
                }
                break;
            case "string":
                if (typeof initialValue === "string") {
                    return initialValue;
                }
                break;
            case "null":
            default:
                if (initialValue === null) {
                    return initialValue;
                }
        }
    }
    if (!required) {
        return undefined;
    }
    if (schema.default !== undefined) {
        switch (schema.type) {
            case "object":
                if (isObject(schema.default)) {
                    return schema.default;
                }
                break;
            case "array":
                if (Array.isArray(schema.default)) {
                    return schema.default;
                }
                break;
            case "number":
            case "integer":
                if (typeof schema.default === "number") {
                    return schema.default;
                }
                break;
            case "boolean":
                if (typeof schema.default === "boolean") {
                    return schema.default;
                }
                break;
            case "string":
                if (typeof schema.default === "string") {
                    return schema.default;
                }
                break;
            case "null":
            default:
                if (schema.default === null) {
                    return schema.default;
                }
        }
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
    updateValue: (value: TValue | undefined, isValid: boolean) => void;
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
                if (!isSame((value1 as ValueType[])[i], (value2 as ValueType[])[i])) {
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

export function switchItem(value: any[], el: HTMLElement, sibling: HTMLElement | null) {
    const fromIndex = +el.dataset["index"];
    if (sibling) {
        const toIndex = +sibling.dataset["index"];
        value.splice(toIndex, 0, value[fromIndex]);
        if (fromIndex > toIndex) {
            value.splice(fromIndex + 1, 1);
        } else {
            value.splice(fromIndex, 1);
        }
    } else {
        value.push(value[fromIndex]);
        value.splice(fromIndex, 1);
    }
}

export function getErrorMessageOfArray(value: any[] | undefined, schema: ArraySchema, locale: Locale) {
    if (value !== undefined) {
        if (schema.minItems !== undefined) {
            if (value.length < schema.minItems) {
                return locale.error.minItems.replace("{0}", String(schema.minItems));
            }
        }
        if (schema.uniqueItems) {
            for (let i = 1; i < value.length; i++) {
                for (let j = 0; j < i; j++) {
                    if (isSame(value[i], value[j])) {
                        return locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                    }
                }
            }
        }
    }
    return "";
}

export function getErrorMessageOfNumber(value: number | undefined, schema: NumberSchema, locale: Locale) {
    if (value !== undefined) {
        if (schema.minimum !== undefined) {
            if (schema.exclusiveMinimum) {
                if (value <= schema.minimum) {
                    return locale.error.largerThan.replace("{0}", String(schema.minimum));
                }
            } else {
                if (value < schema.minimum) {
                    return locale.error.minimum.replace("{0}", String(schema.minimum));
                }
            }
        }
        if (schema.maximum !== undefined) {
            if (schema.exclusiveMaximum) {
                if (value >= schema.maximum) {
                    return locale.error.smallerThan.replace("{0}", String(schema.maximum));
                }
            } else {
                if (value > schema.maximum) {
                    return locale.error.maximum.replace("{0}", String(schema.maximum));
                }
            }
        }
    }
    return "";
}

export function getErrorMessageOfString(value: string | undefined, schema: StringSchema, locale: Locale) {
    if (value !== undefined) {
        if (schema.minLength !== undefined
            && value.length < schema.minLength) {
            return locale.error.minLength.replace("{0}", String(schema.minLength));
        }
        if (schema.maxLength !== undefined
            && value.length > schema.maxLength) {
            return locale.error.maxLength.replace("{0}", String(schema.maxLength));
        }
        if (schema.pattern !== undefined
            && !new RegExp(schema.pattern).test(value)) {
            return locale.error.pattern.replace("{0}", String(schema.pattern));
        }
    }
    return "";
}

export function toggleOptional(value: ValueType | undefined, schema: Schema, initialValue: any) {
    if (value === undefined) {
        return getDefaultValue(true, schema, initialValue);
    } else {
        return undefined;
    }
}

export type ValidityValue<T> = {
    value: T;
    isValid: boolean;
}

export function recordInvalidPropertiesOfObject(invalidProperties: string[], isValid: boolean, property: string) {
    const index = invalidProperties.indexOf(property);
    if (isValid) {
        if (index !== -1) {
            invalidProperties.splice(index, 1);
        }
    } else {
        if (index === -1) {
            invalidProperties.push(property);
        }
    }
}

export function recordInvalidIndexesOfArray(invalidIndexes: number[], isValid: boolean, i: number) {
    const index = invalidIndexes.indexOf(i);
    if (isValid) {
        if (index !== -1) {
            invalidIndexes.splice(index, 1);
        }
    } else {
        if (index === -1) {
            invalidIndexes.push(i);
        }
    }
}
