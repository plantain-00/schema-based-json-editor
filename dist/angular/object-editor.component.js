"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var ObjectEditorComponent = (function () {
    function ObjectEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.collapsed = false;
        this.properties = [];
        this.buttonGroupStyle = common.buttonGroupStyle;
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
    ObjectEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        if (!this.collapsed && this.value !== undefined) {
            var _loop_1 = function(property) {
                var schema = this_1.schema.properties[property];
                var required = this_1.schema.required && this_1.schema.required.some(function (r) { return r === property; });
                this_1.value[property] = common.getDefaultValue(required, schema, this_1.value[property]);
                this_1.properties.push({
                    name: property,
                    value: schema,
                });
            };
            var this_1 = this;
            for (var property in this.schema.properties) {
                _loop_1(property);
            }
        }
        this.updateValue.emit(this.value);
    };
    ObjectEditorComponent.prototype.isRequired = function (property) {
        return this.schema.required && this.schema.required.some(function (r) { return r === property; });
    };
    ObjectEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
    };
    ObjectEditorComponent.prototype.onChange = function (property, value) {
        this.value[property] = value;
        this.updateValue.emit(this.value);
    };
    ObjectEditorComponent.prototype.hasDeleteButton = function () {
        return this.onDelete && !this.readonly && !this.schema.readonly;
    };
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], ObjectEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], ObjectEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "required", void 0);
    ObjectEditorComponent = __decorate([
        core_1.Component({
            selector: "object-editor",
            template: "\n    <div [class]=\"theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <button [class]=\"theme.button\" (click)=\"collapseOrExpand\">\n                    <icon [icon]=\"icon\" [text]=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button *ngIf=\"hasDeleteButton()\" [class]=\"theme.button\" (click)=\"onDelete()\">{{icon.delete}}</button>\n            </div>\n        </h3>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div *ngIf=\"!collapsed && value !== undefined\" [class]=\"theme.rowContainer\">\n            <editor *ngFor=\"let property of properties; trackBy: trackByFunction\"\n                [schema]=\"property.value\"\n                [title]=\"property.value.title || property.name\"\n                [initialValue]=\"value[property.name]\"\n                (updateValue)=\"onChange(property.name, $event)\"\n                [theme]=\"theme\"\n                [icon]=\"icon\"\n                [locale]=\"locale\"\n                [required]=\"isRequired(property.name)\"\n                [readonly]=\"readonly || schema.readonly\">\n            </editor>\n        </div>\n    </div >\n    ",
        })
    ], ObjectEditorComponent);
    return ObjectEditorComponent;
}());
exports.ObjectEditorComponent = ObjectEditorComponent;
//# sourceMappingURL=object-editor.component.js.map