"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var BooleanEditorComponent = (function () {
    function BooleanEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
    }
    BooleanEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit(this.value);
    };
    BooleanEditorComponent.prototype.onChange = function (e) {
        this.value = e.target.checked;
        this.updateValue.emit(this.value);
    };
    BooleanEditorComponent.prototype.toggleOptional = function () {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue === undefined);
        }
        else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    };
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
            template: "\n    <div [class]=\"theme.row\">\n        <title-editor></title-editor>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div *ngIf=\"value !== undefined\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\"\n                    (change)=\"onChange\"\n                    [checked]=\"value\"\n                    [readOnly]=\"readonly || schema.readonly\" />\n                {{title}}\n            </label>\n        </div>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
        })
    ], BooleanEditorComponent);
    return BooleanEditorComponent;
}());
exports.BooleanEditorComponent = BooleanEditorComponent;
//# sourceMappingURL=boolean-editor.component.js.map