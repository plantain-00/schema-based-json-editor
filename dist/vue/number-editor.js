"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.numberEditor = {
    template: "\n    <div :class=\"errorMessage ? theme.errorRow : theme.row\">\n        <title-editor :title=\"title\"\n            @delete=\"$emit('delete')\"\n            :has-delete-button=\"hasDeleteButton\"\n            :theme=\"theme\"\n            :icon=\"icon\"\n            :locale=\"locale\">\n        </title-editor>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <input v-if=\"useInput()\"\n            :class=\"theme.formControl\"\n            type=\"number\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            :value=\"value\"\n            :readOnly=\"readonly || schema.readonly\" />\n        <select v-if=\"useSelect()\"\n            :class=\"theme.formControl\"\n            type=\"number\"\n            @change=\"onChange($event)\">\n            <option v-for=\"(e, i) in schema.enum\"\n                :key=\"i\"\n                :value=\"e\"\n                :selected=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <p v-if=\"errorMessage\" :class=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", value);
        return {
            value: value,
            errorMessage: undefined,
        };
    },
    methods: {
        useInput: function () {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly);
        },
        useSelect: function () {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        onChange: function (e) {
            this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
            this.validate();
            this.$emit("update-value", this.value);
        },
        validate: function () {
            if (this.value !== undefined) {
                if (this.schema.minimum !== undefined) {
                    if (this.schema.exclusiveMinimum) {
                        if (this.value <= this.schema.minimum) {
                            this.errorMessage = this.locale.error.largerThan.replace("{0}", String(this.schema.minimum));
                            return;
                        }
                    }
                    else {
                        if (this.value < this.schema.minimum) {
                            this.errorMessage = this.locale.error.minimum.replace("{0}", String(this.schema.minimum));
                            return;
                        }
                    }
                }
                if (this.schema.maximum !== undefined) {
                    if (this.schema.exclusiveMaximum) {
                        if (this.value >= this.schema.maximum) {
                            this.errorMessage = this.locale.error.smallerThan.replace("{0}", String(this.schema.maximum));
                            return;
                        }
                    }
                    else {
                        if (this.value > this.schema.maximum) {
                            this.errorMessage = this.locale.error.maximum.replace("{0}", String(this.schema.maximum));
                            return;
                        }
                    }
                }
            }
            this.errorMessage = "";
        },
        toggleOptional: function () {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue);
            }
            else {
                this.value = undefined;
            }
            this.$emit("update-value", this.value);
        },
    },
};
//# sourceMappingURL=number-editor.js.map