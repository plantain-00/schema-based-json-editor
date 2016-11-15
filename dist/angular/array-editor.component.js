"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var ArrayEditorComponent = (function () {
    function ArrayEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.renderSwitch = 1;
        this.collapsed = false;
        this.buttonGroupStyleString = common.buttonGroupStyleString;
        this.invalidIndexes = [];
        this.trackByFunction = function (index, value) {
            return (1 + index) * _this.renderSwitch;
        };
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
        };
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.schema, _this.initialValue);
            _this.validate();
            _this.updateValue.emit({ value: _this.value, isValid: !_this.errorMessage && _this.invalidIndexes.length === 0 });
        };
    }
    ArrayEditorComponent.prototype.getValue = function () {
        if (this.value !== undefined && !this.collapsed) {
            return this.value;
        }
        return [];
    };
    ArrayEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    };
    ArrayEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.drakContainer) {
            var container = this.drakContainer.nativeElement;
            this.drak = common.dragula([container]);
            this.drak.on("drop", function (el, target, source, sibling) {
                if (_this.value) {
                    common.switchItem(_this.value, el, sibling);
                    _this.renderSwitch = -_this.renderSwitch;
                    _this.updateValue.emit({ value: _this.value, isValid: !_this.errorMessage && _this.invalidIndexes.length === 0 });
                }
            });
        }
    };
    ArrayEditorComponent.prototype.ngOnDestroy = function () {
        if (this.drak) {
            this.drak.destroy();
        }
    };
    ArrayEditorComponent.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale);
    };
    ArrayEditorComponent.prototype.addItem = function () {
        this.value.push(common.getDefaultValue(true, this.schema.items, undefined));
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    };
    ArrayEditorComponent.prototype.hasDeleteButtonFunction = function () {
        return this.hasDeleteButton && !this.readonly && !this.schema.readonly;
    };
    ArrayEditorComponent.prototype.onDeleteFunction = function (i) {
        this.value.splice(i, 1);
        this.renderSwitch = -this.renderSwitch;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    };
    ArrayEditorComponent.prototype.onChange = function (i, _a) {
        var value = _a.value, isValid = _a.isValid;
        this.value[i] = value;
        this.validate();
        common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    };
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], ArrayEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], ArrayEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "hasDeleteButton", void 0);
    __decorate([
        core_1.ViewChild("drakContainer")
    ], ArrayEditorComponent.prototype, "drakContainer", void 0);
    ArrayEditorComponent = __decorate([
        core_1.Component({
            selector: "array-editor",
            template: "\n    <div [class]=\"errorMessage ? theme.errorRow : theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyleString\">\n                <button [class]=\"theme.button\" (click)=\"collapseOrExpand()\">\n                    <icon [icon]=\"icon\" [text]=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button *ngIf=\"!readonly && value !== undefined\" [class]=\"theme.button\" (click)=\"addItem()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.add\"></icon>\n                </button>\n                <button *ngIf=\"hasDeleteButtonFunction()\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </h3>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div #drakContainer [class]=\"theme.rowContainer\">\n            <div *ngFor=\"let item of getValue(); let i = index; trackBy:trackByFunction\" [attr.data-index]=\"i\" [class]=\"theme.rowContainer\">\n                <editor [schema]=\"schema.items\"\n                    [title]=\"i\"\n                    [initialValue]=\"value[i]\"\n                    (updateValue)=\"onChange(i, $event)\"\n                    [theme]=\"theme\"\n                    [icon]=\"icon\"\n                    [locale]=\"locale\"\n                    [required]=\"true\"\n                    [readonly]=\"readonly || schema.readonly\"\n                    (onDelete)=\"onDeleteFunction(i)\"\n                    [hasDeleteButton]=\"true\">\n                </editor>\n            </div>\n        </div>\n        <p *ngIf=\"errorMessage\" [class]=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
        })
    ], ArrayEditorComponent);
    return ArrayEditorComponent;
}());
exports.ArrayEditorComponent = ArrayEditorComponent;
//# sourceMappingURL=array-editor.component.js.map