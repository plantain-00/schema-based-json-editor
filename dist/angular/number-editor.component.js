"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var NumberEditorComponent = (function () {
    function NumberEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyleString;
    }
    NumberEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    };
    Object.defineProperty(NumberEditorComponent.prototype, "useInput", {
        get: function () {
            return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberEditorComponent.prototype, "useSelect", {
        get: function () {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberEditorComponent.prototype, "isReadOnly", {
        get: function () {
            return this.readonly || this.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberEditorComponent.prototype, "hasOptionalCheckbox", {
        get: function () {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberEditorComponent.prototype, "titleToShow", {
        get: function () {
            return common.getTitle(this.title, this.schema.title);
        },
        enumerable: true,
        configurable: true
    });
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
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div [class]=\"errorMessage ? theme.errorRow : theme.row\">\n        <label *ngIf=\"titleToShow\" [class]=\"theme.label\">\n            {{titleToShow}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <div *ngIf=\"hasOptionalCheckbox\" [class]=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" [disabled]=\"isReadOnly\" />\n                        {{locale.info.notExists}}\n                    </label>\n                </div>\n                <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <input *ngIf=\"useInput\"\n            [class]=\"theme.formControl\"\n            type=\"number\"\n            (change)=\"onChange($event)\"\n            (keyup)=\"onChange($event)\"\n            [defaultValue]=\"value\"\n            [readOnly]=\"isReadOnly\" />\n        <select *ngIf=\"useSelect\"\n            [class]=\"theme.formControl\"\n            type=\"number\"\n            (change)=\"onChange\">\n            <option *ngFor=\"let e of schema.enum; let i = index; trackBy:trackByFunction\"\n                [value]=\"e\"\n                [selected]=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <p *ngIf=\"errorMessage\" [class]=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
        })
    ], NumberEditorComponent);
    return NumberEditorComponent;
}());
exports.NumberEditorComponent = NumberEditorComponent;
//# sourceMappingURL=number-editor.component.js.map