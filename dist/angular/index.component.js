"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var JSONEditorComponent = (function () {
    function JSONEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
    }
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Output()
    ], JSONEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "readonly", void 0);
    JSONEditorComponent = __decorate([
        core_1.Component({
            selector: "json-editor",
            template: "\n      <boolean-editor schema=\"{{schema}}\" initialValue=\"{{initialValue}}\" title=\"{{title}}\"></boolean-editor>\n    ",
        })
    ], JSONEditorComponent);
    return JSONEditorComponent;
}());
exports.JSONEditorComponent = JSONEditorComponent;
var boolean_editor_component_1 = require("./boolean-editor.component");
exports.BooleanEditorComponent = boolean_editor_component_1.BooleanEditorComponent;
var array_editor_component_1 = require("./array-editor.component");
exports.ArrayEditorComponent = array_editor_component_1.ArrayEditorComponent;
//# sourceMappingURL=index.component.js.map