"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.titleEditor = {
    template: "\n    <label v-if=\"title !== undefined && title !== null && title !== ''\" :class=\"theme.label\">\n        {{title}}\n        <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyle\">\n            <button v-if=\"hasDeleteButton\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n            </button>\n        </div>\n    </label>\n    ",
    props: ["title", "theme", "icon", "locale", "hasDeleteButton"],
    data: function () {
        return {
            buttonGroupStyle: common.buttonGroupStyle,
        };
    },
};
//# sourceMappingURL=title-editor.js.map