"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var ObjectEditorComponent = (function () {
    function ObjectEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.collapsed = false;
        this.properties = [];
        this.buttonGroupStyle = common.buttonGroupStyleString;
        this.invalidProperties = [];
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
        };
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.schema, _this.initialValue);
            _this.updateValue.emit({ value: _this.value, isValid: _this.invalidProperties.length === 0 });
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
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    };
    ObjectEditorComponent.prototype.isRequired = function (property) {
        return this.schema.required && this.schema.required.some(function (r) { return r === property; });
    };
    ObjectEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
    };
    ObjectEditorComponent.prototype.onChange = function (property, _a) {
        var value = _a.value, isValid = _a.isValid;
        this.value[property] = value;
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    };
    Object.defineProperty(ObjectEditorComponent.prototype, "hasDeleteButtonFunction", {
        get: function () {
            return this.hasDeleteButton && !this.readonly && !this.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
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
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "hasDeleteButton", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "dragula", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "md", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "hljs", void 0);
    __decorate([
        core_1.Input()
    ], ObjectEditorComponent.prototype, "forceHttps", void 0);
    ObjectEditorComponent = __decorate([
        core_1.Component({
            selector: "object-editor",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div [class]=\"theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <div *ngIf=\"!required && (value === undefined || !schema.readonly)\" [class]=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" [disabled]=\"readonly || schema.readonly\" />\n                        is undefined\n                    </label>\n                </div>\n                <button [class]=\"theme.button\" (click)=\"collapseOrExpand()\">\n                    <icon [icon]=\"icon\" [text]=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button *ngIf=\"hasDeleteButtonFunction\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">{{icon.delete}}</button>\n            </div>\n        </h3>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <div *ngIf=\"!collapsed && value !== undefined\" [class]=\"theme.rowContainer\">\n            <editor *ngFor=\"let property of properties; trackBy: trackByFunction\"\n                [schema]=\"property.value\"\n                [title]=\"property.value.title || property.name\"\n                [initialValue]=\"value[property.name]\"\n                (updateValue)=\"onChange(property.name, $event)\"\n                [theme]=\"theme\"\n                [icon]=\"icon\"\n                [locale]=\"locale\"\n                [required]=\"isRequired(property.name)\"\n                [readonly]=\"readonly || schema.readonly\"\n                [dragula]=\"dragula\"\n                [md]=\"md\"\n                [hljs]=\"hljs\"\n                [forceHttps]=\"forceHttps\">\n            </editor>\n        </div>\n    </div >\n    ",
        })
    ], ObjectEditorComponent);
    return ObjectEditorComponent;
}());
exports.ObjectEditorComponent = ObjectEditorComponent;
//# sourceMappingURL=object-editor.component.js.map