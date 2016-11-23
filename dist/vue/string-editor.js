"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.stringEditor = {
    template: "\n    <div :class=\"errorMessage ? theme.errorRow : theme.row\">\n        <label v-if=\"title !== undefined && title !== null && title !== ''\" :class=\"theme.label\">\n            {{title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <button v-if=\"hasDeleteButton\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n                <button v-if=\"isImageUrl\" :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n            </div>\n        </label>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <textarea v-if=\"useTextArea()\"\n            :class=\"theme.formControl\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            rows=\"5\"\n            :readOnly=\"readonly || schema.readonly\">{{value}}</textarea>\n        <input v-if=\"useInput()\"\n            :class=\"theme.formControl\"\n            :type=\"schema.format\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            :value=\"value\"\n            :readOnly=\"readonly || schema.readonly\" />\n        <select v-if=\"useSelect()\"\n            :class=\"theme.formControl\"\n            @change=\"onChange($event)\">\n            <option v-for=\"(e, i) in schema.enum\"\n                :key=\"i\"\n                :value=\"e\"\n                :selected=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <img v-if=\"isImageUrl && !collapsed\" :src=\"value\" />\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <p v-if=\"errorMessage\" :class=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", { value: value, isValid: !this.errorMessage });
        return {
            value: value,
            errorMessage: undefined,
            isImageUrl: false,
            buttonGroupStyle: common.buttonGroupStyle,
            collapsed: false,
        };
    },
    beforeMount: function () {
        this.validate();
    },
    methods: {
        useTextArea: function () {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format === "textarea";
        },
        useInput: function () {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format !== "textarea";
        },
        useSelect: function () {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        onChange: function (e) {
            this.value = e.target.value;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        validate: function () {
            this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
            this.isImageUrl = common.isImageUrl(this.value);
        },
        toggleOptional: function () {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        collapseOrExpand: function () {
            this.collapsed = !this.collapsed;
        },
    },
};
//# sourceMappingURL=string-editor.js.map