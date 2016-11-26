"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.objectEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <div v-if=\"!required && (value === undefined || !schema.readonly)\" :class=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" :disabled=\"readonly || schema.readonly\" />\n                        is undefined\n                    </label>\n                </div>\n                <button :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button v-if=\"hasDeleteButton && !readonly && !schema.readonly\" :class=\"theme.button\" @click=\"$emit('delete')\">{{icon.delete}}</button>\n            </div>\n        </h3>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <div v-if=\"!collapsed && value !== undefined\" :class=\"theme.rowContainer\">\n            <editor v-for=\"(propertySchema, property, i) in schema.properties\"\n                :key=\"i\"\n                :schema=\"propertySchema\"\n                :title=\"propertySchema.title || property\"\n                :initial-value=\"value[property]\"\n                @update-value=\"onChange(property, arguments[0])\"\n                :theme=\"theme\"\n                :icon=\"icon\"\n                :locale=\"locale\"\n                :required=\"isRequired(property)\"\n                :readonly=\"readonly || schema.readonly\"\n                :has-delete-button=\"hasDeleteButton\"\n                :dragula=\"dragula\"\n                :md=\"md\"\n                :hljs=\"hljs\"\n                :forceHttps=\"forceHttps\">\n            </editor>\n        </div>\n    </div >\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        if (!this.collapsed && value !== undefined) {
            var _loop_1 = function(property) {
                var schema = this_1.schema.properties[property];
                var required = this_1.schema.required && this_1.schema.required.some(function (r) { return r === property; });
                value[property] = common.getDefaultValue(required, schema, value[property]);
            };
            var this_1 = this;
            for (var property in this.schema.properties) {
                _loop_1(property);
            }
        }
        this.$emit("update-value", { value: value, isValid: true });
        return {
            collapsed: false,
            value: value,
            buttonGroupStyle: common.buttonGroupStyleString,
            invalidProperties: [],
        };
    },
    methods: {
        isRequired: function (property) {
            return this.schema.required && this.schema.required.some(function (r) { return r === property; });
        },
        collapseOrExpand: function () {
            this.collapsed = !this.collapsed;
        },
        toggleOptional: function () {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
            this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
        },
        onChange: function (property, _a) {
            var value = _a.value, isValid = _a.isValid;
            this.value[property] = value;
            common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
            this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
        },
    },
};
//# sourceMappingURL=object-editor.js.map