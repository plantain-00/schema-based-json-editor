"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.booleanEditor = {
    template: "\n    <div :class=\"theme.row\">\n        <title-editor :title=\"title\"\n            @onDelete=\"onDelete()\"\n            :theme=\"theme\"\n            :icon=\"icon\"\n            :locale=\"locale\">\n        </title-editor>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div v-if=\"value !== undefined\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\"\n                    @change=\"onChange($event)\"\n                    :checked=\"value\"\n                    :readOnly=\"readonly || schema.readonly\" />\n                {{title}}\n            </label>\n        </div>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "updateValue", "theme", "icon", "locale", "onDelete", "readonly", "required"],
    data: function () {
        // this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean;
        // this.updateValue.emit(this.value);
        return {
            value: undefined,
        };
    },
    methods: {
        onChange: function (e) {
            this.value = e.target.checked;
            this.updateValue(this.value);
        },
        toggleOptional: function () {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue === undefined);
            }
            else {
                this.value = undefined;
            }
            this.updateValue(this.value);
        },
    },
};
//# sourceMappingURL=boolean-editor.js.map