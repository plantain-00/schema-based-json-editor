"use strict";
var core_1 = require("@angular/core");
var Editor = (function () {
    function Editor() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], Editor.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], Editor.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "locale", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], Editor.prototype, "required", void 0);
    Editor = __decorate([
        core_1.Component({
            selector: "editor",
            template: "\n    <object-editor *ngIf=\"schema.type === 'object'\" schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></object-editor>\n    <array-editor *ngIf=\"schema.type === 'array'\" schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></array-editor>\n    <number-editor *ngIf=\"schema.type === 'number' || schema.type === 'integer'\" schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></number-editor>\n    <boolean-editor *ngIf=\"schema.type === 'boolean'\" schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></boolean-editor>\n    <null-editor *ngIf=\"schema.type === 'null'\" schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></null-editor>\n    <string-editor *ngIf=\"schema.type === 'string'\" schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></string-editor>\n    ",
        })
    ], Editor);
    return Editor;
}());
exports.Editor = Editor;
//# sourceMappingURL=editor.component.js.map