"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.objectEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <h3>\n            {{titleToShow}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <div v-if=\"hasOptionalCheckbox\" :class=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" :disabled=\"isReadOnly\" />\n                        {{locale.info.notExists}}\n                    </label>\n                </div>\n                <button :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button v-if=\"hasDeleteButtonFunction\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </h3>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <div v-if=\"!collapsed && value !== undefined\" :class=\"theme.rowContainer\">\n            <editor v-for=\"(propertySchema, property, i) in schema.properties\"\n                :key=\"i\"\n                :schema=\"propertySchema\"\n                :title=\"propertySchema.title || property\"\n                :initial-value=\"value[property]\"\n                @update-value=\"onChange(property, arguments[0])\"\n                :theme=\"theme\"\n                :icon=\"icon\"\n                :locale=\"locale\"\n                :required=\"isRequired(property)\"\n                :readonly=\"isReadOnly\"\n                :dragula=\"dragula\"\n                :md=\"md\"\n                :hljs=\"hljs\"\n                :forceHttps=\"forceHttps\">\n            </editor>\n        </div>\n    </div >\n    ",
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
    computed: {
        isReadOnly: function () {
            return this.readonly || this.schema.readonly;
        },
        hasDeleteButtonFunction: function () {
            return this.hasDeleteButton && !this.isReadOnly;
        },
        hasOptionalCheckbox: function () {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        titleToShow: function () {
            if (this.hasDeleteButton) {
                return common.getTitle(common.findTitle(this.value), this.title, this.schema.title);
            }
            return common.getTitle(this.title, this.schema.title);
        },
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