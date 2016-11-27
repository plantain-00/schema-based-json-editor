"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var NullEditorComponent = (function () {
    function NullEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyleString;
    }
    NullEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    NullEditorComponent.prototype.toggleOptional = function () {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: true });
    };
    Object.defineProperty(NullEditorComponent.prototype, "isReadOnly", {
        get: function () {
            return this.readonly || this.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NullEditorComponent.prototype, "hasOptionalCheckbox", {
        get: function () {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NullEditorComponent.prototype, "titleToShow", {
        get: function () {
            return common.getTitle(this.title, this.schema.title);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], NullEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], NullEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input()
    ], NullEditorComponent.prototype, "hasDeleteButton", void 0);
    NullEditorComponent = __decorate([
        core_1.Component({
            selector: "null-editor",
            template: "\n    <div [class]=\"theme.row\">\n        <label *ngIf=\"titleToShow\" [class]=\"theme.label\">\n            {{titleToShow}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <div *ngIf=\"hasOptionalCheckbox\" [class]=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" [disabled]=\"isReadOnly\" />\n                        {{locale.info.notExists}}\n                    </label>\n                </div>\n                <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </label>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n    </div>\n    ",
        })
    ], NullEditorComponent);
    return NullEditorComponent;
}());
exports.NullEditorComponent = NullEditorComponent;
//# sourceMappingURL=null-editor.component.js.map