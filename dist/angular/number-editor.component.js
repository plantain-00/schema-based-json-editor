"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var NumberEditorComponent = (function () {
    function NumberEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyle;
    }
    NumberEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    };
    NumberEditorComponent.prototype.useInput = function () {
        return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly);
    };
    NumberEditorComponent.prototype.useSelect = function () {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
    };
    NumberEditorComponent.prototype.onChange = function (e) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    };
    NumberEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
    };
    NumberEditorComponent.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale);
    };
    NumberEditorComponent.prototype.toggleOptional = function () {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    };
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], NumberEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], NumberEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "hasDeleteButton", void 0);
    NumberEditorComponent = __decorate([
        core_1.Component({
            selector: "number-editor",
            template: "\n    <div [class]=\"errorMessage ? theme.errorRow : theme.row\">\n        <label *ngIf=\"title !== undefined && title !== null && title !== ''\" [class]=\"theme.label\">\n            {{title}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <input *ngIf=\"useInput()\"\n            [class]=\"theme.formControl\"\n            type=\"number\"\n            (change)=\"onChange($event)\"\n            (keyup)=\"onChange($event)\"\n            [defaultValue]=\"value\"\n            [readOnly]=\"readonly || schema.readonly\" />\n        <select *ngIf=\"useSelect()\"\n            [class]=\"theme.formControl\"\n            type=\"number\"\n            (change)=\"onChange\">\n            <option *ngFor=\"let e of schema.enum; let i = index; trackBy:trackByFunction\"\n                [value]=\"e\"\n                [selected]=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <p *ngIf=\"errorMessage\" [class]=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
        })
    ], NumberEditorComponent);
    return NumberEditorComponent;
}());
exports.NumberEditorComponent = NumberEditorComponent;
//# sourceMappingURL=number-editor.component.js.map