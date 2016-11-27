"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var BooleanEditorComponent = (function () {
    function BooleanEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyleString;
    }
    BooleanEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    BooleanEditorComponent.prototype.onChange = function (e) {
        this.value = !this.value;
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    BooleanEditorComponent.prototype.toggleOptional = function () {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    Object.defineProperty(BooleanEditorComponent.prototype, "isReadOnly", {
        get: function () {
            return this.readonly || this.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BooleanEditorComponent.prototype, "hasOptionalCheckbox", {
        get: function () {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BooleanEditorComponent.prototype, "titleToShow", {
        get: function () {
            return common.getTitle(this.title, this.schema.title);
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <div [class]=\"theme.row\">\n        <label *ngIf=\"titleToShow\" [class]=\"theme.label\">\n            {{titleToShow}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <div *ngIf=\"hasOptionalCheckbox\" [class]=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" [disabled]=\"isReadOnly\" />\n                        {{locale.info.notExists}}\n                    </label>\n                </div>\n                <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <div *ngIf=\"value !== undefined\">\n            <div [class]=\"theme.radiobox\">\n                <label>\n                    <input type=\"radio\"\n                        (change)=\"onChange($event)\"\n                        [checked]=\"value\"\n                        [disabled]=\"isReadOnly\" />\n                    true\n                </label>\n            </div>\n            <div [class]=\"theme.radiobox\">\n                <label>\n                    <input type=\"radio\"\n                        (change)=\"onChange($event)\"\n                        [checked]=\"!value\"\n                        [disabled]=\"isReadOnly\" />\n                    false\n                </label>\n            </div>\n        </div>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
        })
    ], BooleanEditorComponent);
    return BooleanEditorComponent;
}());
exports.BooleanEditorComponent = BooleanEditorComponent;
//# sourceMappingURL=boolean-editor.component.js.map