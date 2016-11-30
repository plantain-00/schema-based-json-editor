import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue";
import * as common from "../../dist/common";

import * as dragula from "dragula";
import * as MarkdownIt from "markdown-it";
import * as hljs from "highlight.js";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

type This = {
    color: string;
    valueHtml: string;
    schema: typeof schema;
} & Vue;

new Vue({
    el: "#container",
    data() {
        const value = {};
        return {
            schema,
            value,
            color: "black",
            locale: navigator.language,
            dragula,
            markdownit: MarkdownIt,
            hljs,
            valueHtml: "",
            schemaSchema: {
                title: "Schema:",
                type: "string",
                format: "code",
            },
        };
    },
    computed: {
        formattedSchema(this: This) {
            return JSON.stringify(this.schema, null, "  ");
        },
    },
    methods: {
        updateSchema(this: This, {value}: common.ValidityValue<common.ValueType>) {
            this.schema = JSON.parse(value as string);
        },
        updateValue(this: This, {value, isValid}: common.ValidityValue<common.ValueType>) {
            this.valueHtml = hljs.highlight("json", JSON.stringify(value, null, "  ")).value;
            this.color = isValid ? "black" : "red";
        },
    },
});
