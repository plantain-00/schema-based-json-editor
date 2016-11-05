"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.objectEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <button :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button v-if=\"hasDeleteButton && !readonly && !schema.readonly\" :class=\"theme.button\" @click=\"$emit('delete')\">{{icon.delete}}</button>\n            </div>\n        </h3>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div v-if=\"!collapsed && value !== undefined\" :class=\"theme.rowContainer\">\n            <editor v-for=\"(propertySchema, property, i) in schema.properties\"\n                :key=\"i\"\n                :schema=\"propertySchema\"\n                :title=\"propertySchema.title || property\"\n                :initial-value=\"value[property]\"\n                @update-value=\"onChange(property, arguments[0])\"\n                :theme=\"theme\"\n                :icon=\"icon\"\n                :locale=\"locale\"\n                :required=\"isRequired(property)\"\n                :readonly=\"readonly || schema.readonly\"\n                :has-delete-button=\"hasDeleteButton\">\n            </editor>\n        </div>\n    </div >\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
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
        this.$emit("update-value", value);
        return {
            collapsed: false,
            value: value,
            buttonGroupStyle: common.buttonGroupStyle,
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
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue);
            }
            else {
                this.value = undefined;
            }
            this.$emit("update-value", this.value);
        },
        onChange: function (property, value) {
            this.value[property] = value;
            this.$emit("update-value", this.value);
        },
    },
};
//# sourceMappingURL=object-editor.js.map