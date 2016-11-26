"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.stringEditor = {
    template: "\n    <div :class=\"errorMessage ? theme.errorRow : theme.row\">\n        <label v-if=\"title !== undefined && title !== null && title !== ''\" :class=\"theme.label\">\n            {{title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n                <div v-if=\"!required && (value === undefined || !schema.readonly)\" :class=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" :disabled=\"readonly || schema.readonly\" />\n                        is undefined\n                    </label>\n                </div>\n                <button v-if=\"hasDeleteButton\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n                <button v-if=\"canPreview\" :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n            </div>\n        </label>\n        <textarea v-if=\"useTextArea\"\n            :class=\"theme.formControl\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            rows=\"5\"\n            :readOnly=\"readonly || schema.readonly\">{{value}}</textarea>\n        <input v-if=\"useInput\"\n            :class=\"theme.formControl\"\n            :type=\"schema.format\"\n            @change=\"onChange($event)\"\n            @keyup=\"onChange($event)\"\n            :value=\"value\"\n            :readOnly=\"readonly || schema.readonly\" />\n        <select v-if=\"useSelect\"\n            :class=\"theme.formControl\"\n            @change=\"onChange($event)\">\n            <option v-for=\"(e, i) in schema.enum\"\n                :key=\"i\"\n                :value=\"e\"\n                :selected=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <img v-if=\"value && !collapsed && canPreviewImage\"\n            :style=\"imagePreviewStyle\"\n            :src=\"getImageUrl\" />\n        <div v-if=\"value && !collapsed && canPreviewMarkdown\" v-html=\"getMarkdown\"></div>\n        <pre v-if=\"value && !collapsed && canPreviewCode\"><code v-html=\"getCode\"></code></pre>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <p v-if=\"errorMessage\" :class=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", { value: value, isValid: !this.errorMessage });
        return {
            value: value,
            errorMessage: undefined,
            buttonGroupStyle: common.buttonGroupStyleString,
            collapsed: false,
            imagePreviewStyle: common.imagePreviewStyleString,
        };
    },
    beforeMount: function () {
        this.validate();
    },
    computed: {
        canPreviewImage: function () {
            return common.isImageUrl(this.value);
        },
        canPreviewMarkdown: function () {
            return this.md && this.schema.format === "markdown";
        },
        canPreviewCode: function () {
            return this.hljs && this.schema.format === "code";
        },
        canPreview: function () {
            return this.value && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
        },
        useTextArea: function () {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
                && (this.schema.format === "textarea" || this.schema.format === "code" || this.schema.format === "markdown");
        },
        useInput: function () {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
                && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
        },
        useSelect: function () {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        getImageUrl: function () {
            return this.forceHttps ? common.replaceProtocal(this.value) : this.value;
        },
        getMarkdown: function () {
            return this.md.render(this.value);
        },
        getCode: function () {
            return this.hljs.highlightAuto(this.value).value;
        },
    },
    methods: {
        onChange: function (e) {
            this.value = e.target.value;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        validate: function () {
            this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
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