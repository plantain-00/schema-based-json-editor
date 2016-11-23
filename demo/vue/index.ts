import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue";
import * as common from "../../dist/common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

type This = {
    schema: common.Schema;
    value: any;
    color: string;
    valueString: string;
};

new Vue({
    el: "#container",
    data() {
        const value = {};
        return {
            schema,
            value,
            color: "black",
            valueString: JSON.stringify(value, null, "  "),
            schemaString: JSON.stringify(schema, null, "  "),
            locale: navigator.language,
        };
    },
    methods: {
        updateValue(this: This, {value, isValid}: common.ValidityValue<common.ValueType>) {
            this.valueString = JSON.stringify(value, null, "  ");
            this.color = isValid ? "black" : "red";
        },
    },
});
