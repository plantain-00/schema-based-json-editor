"use strict";
require("tslib");
exports.toNumber = require("lodash.tonumber");
exports.toInteger = require("lodash.tointeger");
var dragula = require("dragula");
exports.dragula = dragula;
exports.themes = {
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
var defaultTheme = {
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
function getTheme(name) {
    if (name === undefined) {
        return defaultTheme;
    }
    if (typeof name === "string") {
        return exports.themes[name] || defaultTheme;
    }
    return name;
}
exports.getTheme = getTheme;
exports.defaultLocale = {
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
exports.locales = {
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
function getLocale(name) {
    if (name === undefined) {
        return exports.defaultLocale;
    }
    if (typeof name === "string") {
        return exports.locales[name] || exports.defaultLocale;
    }
    return name;
}
exports.getLocale = getLocale;
function getIcon(name, locale, icons) {
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
exports.getIcon = getIcon;
function getDefaultValue(required, schema, initialValue) {
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
            }
            else {
                return 0;
            }
        case "boolean":
            return false;
        case "string":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            }
            else {
                return "";
            }
        case "null":
        default:
            return null;
    }
}
exports.getDefaultValue = getDefaultValue;
exports.buttonGroupStyle = { marginLeft: "10px" };
exports.buttonGroupStyleString = "margin-left: 10px";
function isSame(value1, value2) {
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
        if (Array.isArray(value2) && value1.length === value2.length) {
            for (var i = 0; i < value1.length; i++) {
                if (!isSame(value1, value2)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    if (Array.isArray(value2)
        || Object.keys(value1).length !== Object.keys(value1).length) {
        return false;
    }
    for (var key in value1) {
        if (!isSame(value1[key], value2[key])) {
            return false;
        }
    }
    return true;
}
exports.isSame = isSame;
//# sourceMappingURL=common.js.map