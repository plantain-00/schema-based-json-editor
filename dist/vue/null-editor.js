"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.nullEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <title-editor :title=\"title\"\n            @onDelete=\"onDelete()\"\n            :theme=\"theme\"\n            :icon=\"icon\"\n            :locale=\"locale\">\n        </title-editor>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "updateValue", "theme", "icon", "locale", "onDelete", "readonly", "required"],
    data: function () {
        //  this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null;
        //  this.updateValue.emit(this.value as any);
        return {
            value: undefined,
        };
    },
    methods: {
        toggleOptional: function () {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue);
            }
            else {
                this.value = undefined;
            }
            this.updateValue(this.value);
        },
    },
};
//# sourceMappingURL=null-editor.js.map