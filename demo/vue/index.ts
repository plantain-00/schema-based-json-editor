import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue";
import * as common from "../../dist/common";

declare const require: any;
import * as dragula from "dragula";
const markdownit = require("markdown-it");
import * as hljs from "highlight.js";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

type This = {
    schema: common.Schema;
    value: any;
    color: string;
    valueHtml: string;
};

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
            markdownit,
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
