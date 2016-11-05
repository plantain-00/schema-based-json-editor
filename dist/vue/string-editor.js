"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.stringEditor = {
    template: "\n    <div :class=\"errorMessage ? theme.errorRow : theme.row\">\n        <title-editor :title=\"title\"\n            @delete=\"$emit('delete')\"\n            :has-delete-button=\"hasDeleteButton\"\n            :theme=\"theme\"\n            :icon=\"icon\"\n            :locale=\"locale\">\n        </title-editor>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <textarea v-if=\"useTextArea()\"\n            :class=\"theme.formControl\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            rows=\"5\"\n            :readOnly=\"readonly || schema.readonly\">{{value}}</textarea>\n        <input v-if=\"useInput()\"\n            :class=\"theme.formControl\"\n            :type=\"schema.format\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            :value=\"value\"\n            :readOnly=\"readonly || schema.readonly\" />\n        <select v-if=\"useSelect()\"\n            :class=\"theme.formControl\"\n            @change=\"onChange($event)\">\n            <option v-for=\"(e, i) in schema.enum\"\n                :key=\"i\"\n                :value=\"e\"\n                :selected=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <p v-if=\"errorMessage\" :class=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", value);
        return {
            value: value,
            errorMessage: undefined,
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
            this.$emit("update-value", this.value);
        },
        validate: function () {
            if (this.value !== undefined) {
                if (this.schema.minLength !== undefined
                    && this.value.length < this.schema.minLength) {
                    this.errorMessage = this.locale.error.minLength.replace("{0}", String(this.schema.minLength));
                    return;
                }
                if (this.schema.maxLength !== undefined
                    && this.value.length > this.schema.maxLength) {
                    this.errorMessage = this.locale.error.maxLength.replace("{0}", String(this.schema.maxLength));
                    return;
                }
                if (this.schema.pattern !== undefined
                    && !new RegExp(this.schema.pattern).test(this.value)) {
                    this.errorMessage = this.locale.error.pattern.replace("{0}", String(this.schema.pattern));
                    return;
                }
            }
            this.errorMessage = "";
        },
        toggleOptional: function () {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue);
                this.validate();
            }
            else {
                this.value = undefined;
            }
            this.$emit("update-value", this.value);
        },
    },
};
//# sourceMappingURL=string-editor.js.map