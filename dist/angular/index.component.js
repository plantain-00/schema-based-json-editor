"use strict";
var core_1 = require("@angular/core");
var JSONEditorComponent = (function () {
    function JSONEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
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
            template: "{{this.theme}}",
        })
    ], JSONEditorComponent);
    return JSONEditorComponent;
}());
exports.JSONEditorComponent = JSONEditorComponent;
//# sourceMappingURL=index.component.js.map