"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.booleanEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <label v-if=\"title !== undefined && title !== null && title !== ''\" :class=\"theme.label\">\n            {{title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <button v-if=\"hasDeleteButton\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div v-if=\"value !== undefined\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\"\n                    @change=\"onChange($event)\"\n                    :checked=\"value\"\n                    :readOnly=\"readonly || schema.readonly\" />\n                {{title}}\n            </label>\n        </div>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", { value: value, isValid: true });
        return {
            value: value,
            buttonGroupStyle: common.buttonGroupStyle,
        };
    },
    methods: {
        onChange: function (e) {
            this.value = e.target.checked;
            this.$emit("update-value", { value: this.value, isValid: true });
        },
        toggleOptional: function () {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
            this.$emit("update-value", { value: this.value, isValid: true });
        },
    },
};
//# sourceMappingURL=boolean-editor.js.map