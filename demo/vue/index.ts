import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue/index";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

type This = {
    schema: any;
    value: any;
}

new Vue({
    el: "#container",
    data: function () {
        return {
            schema,
            value: {},
        };
    },
    computed: {
        schemaString: function () {
            return JSON.stringify(schema, null, "  ");
        },
        valueString: function (this: This) {
            return JSON.stringify(this.value, null, "  ");
        },
    },
    methods: {
        updateValue(this: This, value: any) {
            this.value = value;
        },
    },
});
