"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var ObjectEditorComponent = (function () {
    function ObjectEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.collapsed = false;
        this.properties = [];
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
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
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
        this.updateValue.emit(this.value);
    }
    ObjectEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
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
            template: "\n    <div>\n        <h3>\n            {{title || schema.title}}\n            <div [class]=\"theme.buttonGroup\" [style=\"common.buttonGroupStyle\">\n                <button [class]=\"theme.button\" (click)=\"collapseOrExpand\">{{collapsed ? icon.expand : icon.collapse}}</button>\n                <button *ngIf=\"onDelete && !readonly && !schema.readonly\" [class]=\"theme.button\" (click)=\"onDelete\">{{icon.delete}}</button>\n            </div>\n        </h3>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div *ngIf=\"!collapsed && value !== undefined\" [class]=\"theme.rowContainer\">\n            <editor *ngFor=\"let property of properties; let i = index; trackBy: trackByFunction\"\n                [schema]=\"schema\"\n                [title]=\"schema.title || property.name\"\n                [initialValue]=\"value[property.name]\"\n                (updateValue)=\"onChange\"\n                [theme]=\"theme\"\n                [icon]=\"icon\"\n                [locale]=\"locale\"\n                [required]=\"required\"\n                [readonly]=\"readonly || schema.readonly\">\n            </editor>\n        </div>\n    </div >\n    ",
        })
    ], ObjectEditorComponent);
    return ObjectEditorComponent;
}());
exports.ObjectEditorComponent = ObjectEditorComponent;
//# sourceMappingURL=object-editor.component.js.map