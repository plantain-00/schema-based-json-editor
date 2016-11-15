import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue/index";
import * as common from "../../dist/common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

type This = {
    schema: any;
    value: any;
    isValidString: string;
    valueString: any;
}

new Vue({
    el: "#container",
    data() {
        const value = {};
        return {
            schema,
            value,
            isValidString: "false",
            valueString: JSON.stringify(value, null, "  "),
            schemaString: JSON.stringify(schema, null, "  "),
        };
    },
    methods: {
        updateValue(this: This, {value, isValid}: common.ValidityValue<common.ValueType>) {
            this.valueString = JSON.stringify(value, null, "  ");
            this.isValidString = String(isValid);
        },
    },
});
