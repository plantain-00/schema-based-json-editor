import "tslib";

import * as toNumber from "lodash/toNumber";
import * as toInteger from "lodash/toInteger";
import * as debounce from "lodash/debounce";
import * as isObject from "lodash/isObject";
import * as isInteger from "lodash/isInteger";

export { toNumber, toInteger, debounce };

export type CommonSchema = {
    $schema?: string;
    title?: string;
    description?: string;
    default?: ValueType;
    readonly?: boolean;
    propertyOrder?: number;
};

export type ObjectSchema = CommonSchema & {
    type: "object";
    properties: { [name: string]: Schema };
    required?: string[];
    maxProperties?: number;
    minProperties?: number;
};

export type ArraySchema = CommonSchema & {
    type: "array";
    items: Schema;
    minItems?: number;
    uniqueItems?: boolean;
};

export type NumberSchema = CommonSchema & {
    type: "number" | "integer";
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    enum?: number[];
    multipleOf?: number;
};

export type StringSchema = CommonSchema & {
    type: "string";
    format?: "textarea" | "color" | "date" | "datetime" | "datetime-local" | "time" | "month" | "email" | "uri" | "url" | "week" | "hostname" | "ipv4" | "ipv6" | "code" | "markdown";
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};

export type BooleanSchema = CommonSchema & {
    type: "boolean";
};

export type NullSchema = CommonSchema & {
    type: "null";
};

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
    radiobox: string;
};

export const themes: { [name: string]: Theme } = {
    "bootstrap3": {
        rowContainer: "well bootstrap3-row-container",
        row: "row",
        formControl: "form-control",
        button: "btn btn-default",
        help: "help-block",
        errorRow: "row has-error",
        label: "control-label",
        optionalCheckbox: "checkbox pull-left",
        buttonGroup: "btn-group",
        radiobox: "radio-inline",
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
    radiobox: "",
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
        lock: string;
        unlock: string;
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
        multipleOf: string;
        minProperties: string;
        maxProperties: string;
    },
    info: {
        notExists: string;
        true: string;
        false: string;
    },
};

export const defaultLocale: Locale = {
    button: {
        collapse: "Collapse",
        expand: "Expand",
        add: "Add",
        delete: "Delete",
        lock: "lock",
        unlock: "unlock",
    },
    error: {
        minLength: "Value must be at least {0} characters long.",
        maxLength: "Value must be at most {0} characters long.",
        pattern: "Value doesn't match the pattern {0}.",
        minimum: "Value must be >= {0}.",
        maximum: "Value must be <= {0}.",
        largerThan: "Value must be > {0}.",
        smallerThan: "Value must be < {0}.",
        minItems: "The length of the array must be >= {0}.",
        uniqueItems: "The item in {0} and {1} must not be same.",
        multipleOf: "Value must be multiple value of {0}.",
        minProperties: "Properties count must be >= {0}.",
        maxProperties: "Properties count must be <= {0}.",
    },
    info: {
        notExists: "not exists",
        true: "true",
        false: "false",
    },
};

export const locales: { [name: string]: Locale } = {
    "zh-cn": {
        button: {
            collapse: "折叠",
            expand: "显示",
            add: "增加",
            delete: "删除",
            lock: "锁定",
            unlock: "解锁",
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
            multipleOf: "要求是 {0} 的整数倍。",
            minProperties: "要求属性个数 >= {0}。",
            maxProperties: "要求属性个数 <= {0}。",
        },
        info: {
            notExists: "不存在",
            true: "是",
            false: "否",
        },
    },
};

export function getLocale(name: string | undefined | Locale): Locale {
    if (name === undefined) {
        return defaultLocale;
    }
    if (typeof name === "string") {
        return locales[name.toLowerCase()] || defaultLocale;
    }
    return name;
};

export type Icon = {
    isText: boolean;
    collapse: string;
    expand: string;
    add: string;
    delete: string;
    lock: string;
    unlock: string;
};

const icons: { [name: string]: Icon } = {
    "bootstrap3": {
        isText: false,
        collapse: "glyphicon glyphicon-chevron-down",
        expand: "glyphicon glyphicon-chevron-right",
        add: "glyphicon glyphicon-plus",
        delete: "glyphicon glyphicon-remove",
        lock: "glyphicon glyphicon-lock",
        unlock: "glyphicon glyphicon-edit",
    },
    "fontawesome4": {
        isText: false,
        collapse: "fa fa-caret-square-o-down",
        expand: "fa fa-caret-square-o-right",
        add: "fa fa-plus",
        delete: "fa fa-times",
        lock: "fa fa-lock",
        unlock: "fa fa-unlock",
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
            lock: locale.button.lock,
            unlock: locale.button.unlock,
        };
    }
    if (typeof name === "string") {
        return icons[name] || {
            isText: true,
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
            lock: locale.button.lock,
            unlock: locale.button.unlock,
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

export const buttonGroupStyle: React.CSSProperties = { marginLeft: "10px" };
export const buttonGroupStyleString = "margin-left: 10px";

import { hljs as hljsLib, React, dragula, MarkdownIt } from "../typings/lib";

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
    md?: MarkdownIt.MarkdownIt;
    hljs?: typeof hljsLib;
    forceHttps?: boolean;
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
        if (schema.multipleOf && schema.multipleOf > 0) {
            if (!isInteger(value / schema.multipleOf)) {
                return locale.error.multipleOf.replace("{0}", String(schema.multipleOf));
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

export function getErrorMessageOfObject(value: { [name: string]: ValueType } | undefined, schema: ObjectSchema, locale: Locale) {
    if (value !== undefined) {
        let length = 0;
        for (const key in value) {
            if (value[key] !== undefined) {
                length++;
            }
        }
        if (schema.minProperties !== undefined
            && length < schema.minProperties) {
            return locale.error.minProperties.replace("{0}", String(schema.minProperties));
        }
        if (schema.maxProperties !== undefined
            && length > schema.maxProperties) {
            return locale.error.maxProperties.replace("{0}", String(schema.maxProperties));
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
};

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

const imageExtensions = [".png", ".jpg", ".bmp", ".gif"];

export function isImageUrl(value?: string) {
    if (!value || value.length <= "https://".length) {
        return false;
    }
    if (value.substr(0, "http://".length) !== "http://"
        && value.substr(0, "https://".length) !== "https://") {
        return false;
    }
    const extensionName = value.substr(value.length - 4, 4);
    return imageExtensions.indexOf(extensionName) !== -1;
}

export function replaceProtocal(src: string) {
    if (src.indexOf("http://") === 0 && src.indexOf("http://localhost") !== 0) {
        return "https://" + src.substring("http://".length);
    }
    return src;
}

export const imagePreviewStyleString = "display: block; height: auto; margin: 6px 0; max-width: 100%;";
export const imagePreviewStyle: React.CSSProperties = {
    display: "block",
    height: "auto",
    margin: "6px 0",
    maxWidth: "100%",
};

export function initializeMarkdown(markdownit: typeof MarkdownIt, hljs: typeof hljsLib | undefined, forceHttps: boolean | undefined) {
    if (!markdownit) {
        return undefined;
    }
    const md = markdownit({
        linkify: true,
        highlight: (str: string, lang: string) => {
            if (hljs) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (error) {
                        console.log(error);
                    }
                }
                try {
                    return hljs.highlightAuto(str).value;
                } catch (error) {
                    console.log(error);
                }
            }
            return "";
        },
    });

    md.renderer.rules["image"] = (tokens: MarkdownIt.Token[], index: number, options: any, env: any, self: MarkdownIt.Renderer) => {
        const token = tokens[index];
        const aIndex = token.attrIndex("src");
        if (forceHttps) {
            token.attrs[aIndex][1] = replaceProtocal(token.attrs[aIndex][1]);
        }
        token.attrPush(["style", imagePreviewStyleString]);

        return md.renderer.rules["image"](tokens, index, options, env, self);
    };

    let defaultLinkRender: MarkdownIt.TokenRender;
    if (md.renderer.rules["link_open"]) {
        defaultLinkRender = md.renderer.rules["link_open"];
    } else {
        defaultLinkRender = (tokens: MarkdownIt.Token[], index: number, options: any, env: any, self: MarkdownIt.Renderer) => {
            return self.renderToken(tokens, index, options);
        };
    }
    md.renderer.rules["link_open"] = (tokens: MarkdownIt.Token[], index: number, options: any, env: any, self: MarkdownIt.Renderer) => {
        tokens[index].attrPush(["target", "_blank"]);
        tokens[index].attrPush(["rel", "nofollow"]);
        return defaultLinkRender(tokens, index, options, env, self);
    };
    return md;
}

export function findTitle(value: { [name: string]: ValueType } | undefined) {
    if (value) {
        for (const key in value) {
            const title = value[key];
            if (typeof title === "string" && title.length > 0) {
                if (title.length > 23) {
                    return title.substring(0, 20) + "...";
                }
                return title;
            } else {
                continue;
            }
        }
    }
    return undefined;
}

export function getTitle(...titles: any[]) {
    for (const title of titles) {
        if (title === undefined || title === null) {
            continue;
        }
        return String(title);
    }
    return "";
}

export function compare(a: { name: string; value: Schema }, b: { name: string; value: Schema }) {
    if (typeof a.value.propertyOrder === "number") {
        if (typeof b.value.propertyOrder === "number") {
            return a.value.propertyOrder - b.value.propertyOrder;
        }
        return -1;
    }
    if (typeof b.value.propertyOrder === "number") {
        return 1;
    }
    return 0;
}
