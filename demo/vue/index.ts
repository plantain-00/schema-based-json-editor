import * as Vue from "vue";
import { schema } from "../schema";

import "../../dist/vue/index";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

new Vue({
    el: "#container",
    data: function() {
        return {
            schema,
            value: {},
        };
    },
    computed: {
        schemaString: function() {
            return JSON.stringify(schema, null, "  ");
        },
        valueString: function(this: any) {
            return JSON.stringify(this.value, null, "  ");
        },
    },
    methods: {
        updateValue(this: any, value: any) {
            this.value = value;
        },
    },
});
