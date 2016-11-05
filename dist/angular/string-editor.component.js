"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var StringEditorComponent = (function () {
    function StringEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = common.getDefaultValue(true, _this.schema, _this.initialValue);
                _this.validate();
            }
            else {
                _this.value = undefined;
            }
            _this.updateValue.emit(_this.value);
        };
    }
    StringEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.validate();
        this.updateValue.emit(this.value);
    };
    StringEditorComponent.prototype.useTextArea = function () {
        return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format === "textarea";
    };
    StringEditorComponent.prototype.useInput = function () {
        return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format !== "textarea";
    };
    StringEditorComponent.prototype.useSelect = function () {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
    };
    StringEditorComponent.prototype.onChange = function (e) {
        this.value = e.target.value;
        this.validate();
        this.updateValue.emit(this.value);
    };
    StringEditorComponent.prototype.validate = function () {
        if (this.value !== undefined) {
            if (this.schema.minLength !== undefined
                && this.value.length < this.schema.minLength) {
                this.errorMessage = this.locale.error.minLength.replace("{0}", String(this.schema.minLength));
                return;
            }
            if (this.schema.maxLength !== undefined
                && this.value.length > this.schema.maxLength) {
                this.errorMessage = this.locale.error.maxLength.replace("{0}", String(this.schema.maxLength));
                return;
            }
            if (this.schema.pattern !== undefined
                && !new RegExp(this.schema.pattern).test(this.value)) {
                this.errorMessage = this.locale.error.pattern.replace("{0}", String(this.schema.pattern));
                return;
            }
        }
        this.errorMessage = "";
    };
    StringEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
    };
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], StringEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], StringEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "hasDeleteButton", void 0);
    StringEditorComponent = __decorate([
        core_1.Component({
            selector: "string-editor",
            template: "\n    <div [class]=\"errorMessage ? theme.errorRow : theme.row\">\n        <title-editor [title]=\"title\"\n            (onDelete)=\"onDelete.emit()\"\n            [theme]=\"theme\"\n            [icon]=\"icon\"\n            [locale]=\"locale\"\n            [hasDeleteButton]=\"hasDeleteButton\">\n        </title-editor>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <textarea *ngIf=\"useTextArea()\"\n            [class]=\"theme.formControl\"\n            (change)=\"onChange($event)\"\n            (keyup)=\"onChange($event)\"\n            rows=\"5\"\n            [readOnly]=\"readonly || schema.readonly\">{{value}}</textarea>\n        <input *ngIf=\"useInput()\"\n            [class]=\"theme.formControl\"\n            [type]=\"schema.format\"\n            (change)=\"onChange($event)\"\n            (keyup)=\"onChange($event)\"\n            [defaultValue]=\"value\"\n            [readOnly]=\"readonly || schema.readonly\" />\n        <select *ngIf=\"useSelect()\"\n            [class]=\"theme.formControl\"\n            (change)=\"onChange($event)\">\n            <option *ngFor=\"let e of schema.enum; let i = index; trackBy:trackByFunction\"\n                [value]=\"e\"\n                [selected]=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <p *ngIf=\"errorMessage\" [class]=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
        })
    ], StringEditorComponent);
    return StringEditorComponent;
}());
exports.StringEditorComponent = StringEditorComponent;
//# sourceMappingURL=string-editor.component.js.map