import * as common from "../dist/common";

export const schema: common.Schema = {
    type: "object",
    title: "A Title example",
    description: "a description example",
    properties: {
        stringExample: {
            type: "string",
            title: "A string example",
            description: "a string description example",
            default: "a default string example",
            minLength: 20,
            maxLength: 25,
        },
        booleanExample: {
            type: "boolean",
            title: "A boolean example",
            description: "a boolean description example",
            default: true,
        },
        numberExample: {
            type: "number",
            title: "A number example",
            description: "a number description example",
            default: 123.4,
            minimum: 10,
            exclusiveMinimum: true,
            maximum: 1000,
            exclusiveMaximum: true,
        },
        integerExample: {
            type: "integer",
            title: "A integer example",
            description: "a integer description example",
            default: 123,
        },
        nullExample: {
            type: "null",
            title: "A null example",
            description: "a null description example",
            default: null,
        },
        objectExample: {
            type: "object",
            title: "A object example",
            description: "a object description example",
            properties: {
                propertyExample1: {
                    type: "string",
                },
                propertyExample2: {
                    type: "number",
                },
            },
            default: {},
            required: ["propertyExample1", "propertyExample2"],
        },
        arrayExample: {
            type: "array",
            title: "A array example",
            description: "a array description example",
            items: {
                type: "string",
                maxLength: 15,
            },
            default: ["default item 1", "default item 2"],
            minItems: 1,
            uniqueItems: true,
        },

        readOnlyExample: {
            type: "string",
            readonly: true,
        },
        enumExample: {
            type: "string",
            enum: [
                "enum 1",
                "enum 2",
            ],
        },
        optionalExample: {
            type: "string",
        },
        colorExample: {
            type: "string",
            format: "color",
            default: "#000000",
        },
        textareaExample: {
            type: "string",
            format: "textarea",
        },
        patternExample: {
            type: "string",
            pattern: "^[A-z]{3}$",
            default: "abc",
        },
        imagePreviewExample: {
            type: "string",
            default: "http://image2.sina.com.cn/bj/art/2004-08-02/U91P52T4D51657F160DT20040802125523.jpg",
        },
    },
    required: [
        "stringExample",
        "booleanExample",
        "numberExample",
        "integerExample",
        "nullExample",
        "objectExample",
        "arrayExample",
        "readOnlyExample",
        "enumExample",
        "colorExample",
        "textareaExample",
        "patternExample",
        "imagePreviewExample",
    ],
};
