import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue/index";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

type This = {
    schema: any;
    value: any;
    valueString: any;
}

new Vue({
    el: "#container",
    data() {
        const value = {};
        return {
            schema,
            value,
            valueString: JSON.stringify(value, null, "  "),
            schemaString: JSON.stringify(schema, null, "  "),
        };
    },
    methods: {
        updateValue(this: This, value: any) {
            this.valueString = JSON.stringify(this.value, null, "  ");
        },
    },
});
