"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var BooleanEditorComponent = (function () {
    function BooleanEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyle;
    }
    BooleanEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    BooleanEditorComponent.prototype.onChange = function (e) {
        this.value = e.target.checked;
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    BooleanEditorComponent.prototype.toggleOptional = function () {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: true });
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
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "hasDeleteButton", void 0);
    BooleanEditorComponent = __decorate([
        core_1.Component({
            selector: "boolean-editor",
            template: "\n    <div [class]=\"theme.row\">\n        <label *ngIf=\"title !== undefined && title !== null && title !== ''\" [class]=\"theme.label\">\n            {{title}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div *ngIf=\"value !== undefined\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\"\n                    (change)=\"onChange($event)\"\n                    [checked]=\"value\"\n                    [readOnly]=\"readonly || schema.readonly\" />\n                {{title}}\n            </label>\n        </div>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
        })
    ], BooleanEditorComponent);
    return BooleanEditorComponent;
}());
exports.BooleanEditorComponent = BooleanEditorComponent;
//# sourceMappingURL=boolean-editor.component.js.map