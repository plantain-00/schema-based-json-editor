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
} & Vue;

new Vue({
    el: "#container",
    data() {
        const value = {};
        return {
            schema,
            value,
            color: "black",
            schemaHtml: hljs.highlight("json", JSON.stringify(schema, null, "  ")).value,
            locale: navigator.language,
            dragula,
            markdownit: MarkdownIt,
            hljs,
            valueHtml: "",
        };
    },
    methods: {
        updateValue(this: This, {value, isValid}: common.ValidityValue<common.ValueType>) {
            this.valueHtml = hljs.highlight("json", JSON.stringify(value, null, "  ")).value;
            this.color = isValid ? "black" : "red";
        },
    },
});
