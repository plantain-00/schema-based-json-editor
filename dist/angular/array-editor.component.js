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
        this.trackByFunction = function (index, value) {
            return (1 + index) * _this.renderSwitch;
        };
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = common.getDefaultValue(true, _this.schema, _this.initialValue);
            }
            else {
                _this.value = undefined;
            }
            _this.updateValue.emit(_this.value);
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
        this.updateValue.emit(this.value);
    };
    ArrayEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.drakContainer) {
            var container = this.drakContainer.nativeElement;
            this.drak = common.dragula([container]);
            this.drak.on("drop", function (el, target, source, sibling) {
                if (_this.value) {
                    var fromIndex = +el.dataset["index"];
                    if (sibling) {
                        var toIndex = +sibling.dataset["index"];
                        _this.value.splice(toIndex, 0, _this.value[fromIndex]);
                        if (fromIndex > toIndex) {
                            _this.value.splice(fromIndex + 1, 1);
                        }
                        else {
                            _this.value.splice(fromIndex, 1);
                        }
                    }
                    else {
                        _this.value.push(_this.value[fromIndex]);
                        _this.value.splice(fromIndex, 1);
                    }
                    _this.renderSwitch = -_this.renderSwitch;
                    _this.updateValue.emit(_this.value);
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
        if (this.value !== undefined) {
            if (this.schema.minItems !== undefined) {
                if (this.value.length < this.schema.minItems) {
                    this.errorMessage = this.locale.error.minItems.replace("{0}", String(this.schema.minItems));
                    return;
                }
            }
            if (this.schema.uniqueItems) {
                for (var i = 1; i < this.value.length; i++) {
                    for (var j = 0; j < i; j++) {
                        if (common.isSame(this.value[i], this.value[j])) {
                            this.errorMessage = this.locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                            return;
                        }
                    }
                }
            }
        }
        this.errorMessage = "";
    };
    ArrayEditorComponent.prototype.addItem = function () {
        this.value.push(common.getDefaultValue(true, this.schema.items, undefined));
        this.updateValue.emit(this.value);
    };
    ArrayEditorComponent.prototype.hasDeleteButtonFunction = function () {
        return this.hasDeleteButton && !this.readonly && !this.schema.readonly;
    };
    ArrayEditorComponent.prototype.onDeleteFunction = function (i) {
        this.value.splice(i, 1);
        this.renderSwitch = -this.renderSwitch;
        this.updateValue.emit(this.value);
        this.validate();
    };
    ArrayEditorComponent.prototype.onChange = function (i, value) {
        this.value[i] = value;
        this.updateValue.emit(this.value);
        this.validate();
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