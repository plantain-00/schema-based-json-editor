/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
"use strict";
exports.icon = {
    template: "\n    <span v-if=\"icon.isText\">{{text}}</span>\n    <i v-else :class=\"text\"></i>\n    ",
    props: ["icon", "text"],
};
//# sourceMappingURL=icon.js.map