"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.booleanEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <label v-if=\"titleToShow\" :class=\"theme.label\">\n            {{titleToShow}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <div v-if=\"hasOptionalCheckbox\" :class=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" :disabled=\"isReadOnly\" />\n                        {{locale.info.notExists}}\n                    </label>\n                </div>\n                <button v-if=\"hasDeleteButton\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <div v-if=\"value !== undefined\">\n            <div :class=\"theme.radiobox\">\n                <label>\n                    <input type=\"radio\"\n                        @change=\"onChange($event)\"\n                        :checked=\"value\"\n                        :disabled=\"isReadOnly\" />\n                    true\n                </label>\n            </div>\n            <div :class=\"theme.radiobox\">\n                <label>\n                    <input type=\"radio\"\n                        @change=\"onChange($event)\"\n                        :checked=\"!value\"\n                        :disabled=\"isReadOnly\" />\n                    false\n                </label>\n            </div>\n        </div>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", { value: value, isValid: true });
        return {
            value: value,
            buttonGroupStyle: common.buttonGroupStyleString,
        };
    },
    computed: {
        isReadOnly: function () {
            return this.readonly || this.schema.readonly;
        },
        hasOptionalCheckbox: function () {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        titleToShow: function () {
            return common.getTitle(this.title, this.schema.title);
        },
    },
    methods: {
        onChange: function (e) {
            this.value = !this.value;
            this.$emit("update-value", { value: this.value, isValid: true });
        },
        toggleOptional: function () {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
            this.$emit("update-value", { value: this.value, isValid: true });
        },
    },
};
//# sourceMappingURL=boolean-editor.js.map