"use strict";
var Vue = require("vue");
var common = require("./common");
var array_editor_1 = require("./vue/array-editor");
var boolean_editor_1 = require("./vue/boolean-editor");
var editor_1 = require("./vue/editor");
var icon_1 = require("./vue/icon");
var null_editor_1 = require("./vue/null-editor");
var number_editor_1 = require("./vue/number-editor");
var object_editor_1 = require("./vue/object-editor");
var string_editor_1 = require("./vue/string-editor");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
Vue.component("array-editor", array_editor_1.arrayEditor);
Vue.component("boolean-editor", boolean_editor_1.booleanEditor);
Vue.component("editor", editor_1.editor);
Vue.component("icon", icon_1.icon);
Vue.component("null-editor", null_editor_1.nullEditor);
Vue.component("numberEditor", number_editor_1.numberEditor);
Vue.component("objectEditor", object_editor_1.objectEditor);
Vue.component("stringEditor", string_editor_1.stringEditor);
Vue.component("json-editor", {
    template: "\n    <div>\n        <object-editor v-if=\"schema.type === 'object'\"\n            :schema=\"schema\"\n            :initial-value=\"initialValue\"\n            :theme=\"themeObject\"\n            :locale=\"localeObject\"\n            :icon=\"iconObject\"\n            :readonly=\"readonly\"\n            :required=\"true\"\n            @update-value=\"updateValueFunction(arguments[0])\"\n            :dragula=\"dragula\"\n            :md=\"md\"\n            :hljs=\"hljs\"\n            :forceHttps=\"forceHttps\">\n        </object-editor>\n        <array-editor v-if=\"schema.type === 'array'\"\n            :schema=\"schema\"\n            :initial-value=\"initialValue\"\n            :theme=\"themeObject\"\n            :locale=\"localeObject\"\n            :icon=\"iconObject\"\n            :readonly=\"readonly\"\n            :required=\"true\"\n            @update-value=\"updateValueFunction(arguments[0])\"\n            :dragula=\"dragula\"\n            :md=\"md\"\n            :hljs=\"hljs\"\n            :forceHttps=\"forceHttps\">\n        </array-editor>\n        <number-editor v-if=\"schema.type === 'number' || schema.type === 'integer'\"\n            :schema=\"schema\"\n            :initial-value=\"initialValue\"\n            :theme=\"themeObject\"\n            :locale=\"localeObject\"\n            :icon=\"iconObject\"\n            :readonly=\"readonly\"\n            :required=\"true\"\n            @update-value=\"updateValueFunction(arguments[0])\">\n        </number-editor>\n        <boolean-editor v-if=\"schema.type === 'boolean'\"\n            :schema=\"schema\"\n            :initial-value=\"initialValue\"\n            :theme=\"themeObject\"\n            :locale=\"localeObject\"\n            :icon=\"iconObject\"\n            :readonly=\"readonly\"\n            :required=\"true\"\n            @update-value=\"updateValueFunction(arguments[0])\">\n        </boolean-editor>\n        <null-editor v-if=\"schema.type === 'null'\"\n            :schema=\"schema\"\n            :initial-value=\"initialValue\"\n            :theme=\"themeObject\"\n            :locale=\"localeObject\"\n            :icon=\"iconObject\"\n            :readonly=\"readonly\"\n            :required=\"true\"\n            @update-value=\"updateValueFunction(arguments[0])\">\n        </null-editor>\n        <string-editor v-if=\"schema.type === 'string'\"\n            :schema=\"schema\"\n            :initial-value=\"initialValue\"\n            :theme=\"themeObject\"\n            :locale=\"localeObject\"\n            :icon=\"iconObject\"\n            :readonly=\"readonly\"\n            :required=\"true\"\n            @update-value=\"updateValueFunction(arguments[0])\"\n            :dragula=\"dragula\"\n            :md=\"md\"\n            :hljs=\"hljs\"\n            :forceHttps=\"forceHttps\">\n        </string-editor>\n    </div>\n    ",
    props: ["schema", "initialValue", "theme", "icon", "locale", "readonly", "dragula", "markdownit", "hljs", "forceHttps"],
    data: function () {
        var localeObject = common.getLocale(this.locale);
        return {
            themeObject: common.getTheme(this.theme),
            localeObject: localeObject,
            iconObject: common.getIcon(this.icon, localeObject),
            md: common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps),
        };
    },
    methods: {
        updateValueFunction: common.debounce(function (validityValue) {
            this.$emit("update-value", validityValue);
        }, 100),
    },
});
//# sourceMappingURL=vue.js.map