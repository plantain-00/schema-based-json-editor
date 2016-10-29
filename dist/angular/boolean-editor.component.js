"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var BooleanEditorComponent = (function () {
    function BooleanEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        if (this.required) {
            this.value = common.getDefaultValue(this.schema, this.initialValue);
        }
        else {
            this.value = undefined;
        }
        if (this.value !== this.initialValue) {
            this.updateValue.emit(this.value);
        }
    }
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], BooleanEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], BooleanEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "required", void 0);
    BooleanEditorComponent = __decorate([
        core_1.Component({
            selector: "boolean-editor",
            template: "hello",
        })
    ], BooleanEditorComponent);
    return BooleanEditorComponent;
}());
exports.BooleanEditorComponent = BooleanEditorComponent;
//# sourceMappingURL=boolean-editor.component.js.map