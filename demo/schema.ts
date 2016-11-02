export const schema: any = {
    type: "object",
    title: "A Title example",
    description: "a description example",
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
    ],
    properties: {
        stringExample: {
            type: "string",
            title: "A string example",
            description: "a string description example",
            default: "a default string example",
            minLength: 20,
            maxLength: 30,
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
        },
        arrayExample: {
            type: "array",
            title: "A array example",
            description: "a array description example",
            items: {
                type: "string",
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
    },
};
