"use strict";
var core_1 = require("@angular/core");
var common = require("./common");
var JSONEditorComponent = (function () {
    function JSONEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.updateValueFunction = common.debounce(function (value) {
            _this.updateValue.emit(value);
        }, 100);
    }
    JSONEditorComponent.prototype.ngOnInit = function () {
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
        this.iconObject = common.getIcon(this.icon, this.localeObject);
    };
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Output()
    ], JSONEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input()
    ], JSONEditorComponent.prototype, "readonly", void 0);
    JSONEditorComponent = __decorate([
        core_1.Component({
            selector: "json-editor",
            template: "\n    <object-editor *ngIf=\"schema.type === 'object'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\"\n        [required]=\"true\"\n        (updateValue)=\"updateValueFunction($event)\">\n    </object-editor>\n    <array-editor *ngIf=\"schema.type === 'array'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\"\n        [required]=\"true\"\n        (updateValue)=\"updateValueFunction($event)\">\n    </array-editor>\n    <number-editor *ngIf=\"schema.type === 'number' || schema.type === 'integer'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\"\n        [required]=\"true\"\n        (updateValue)=\"updateValueFunction($event)\">\n    </number-editor>\n    <boolean-editor *ngIf=\"schema.type === 'boolean'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\"\n        [required]=\"true\"\n        (updateValue)=\"updateValueFunction($event)\">\n    </boolean-editor>\n    <null-editor *ngIf=\"schema.type === 'null'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\"\n        [required]=\"true\"\n        (updateValue)=\"updateValueFunction($event)\">\n    </null-editor>\n    <string-editor *ngIf=\"schema.type === 'string'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\"\n        [required]=\"true\"\n        (updateValue)=\"updateValueFunction($event)\">\n    </string-editor>\n    ",
        })
    ], JSONEditorComponent);
    return JSONEditorComponent;
}());
exports.JSONEditorComponent = JSONEditorComponent;
var boolean_editor_component_1 = require("./angular/boolean-editor.component");
exports.BooleanEditorComponent = boolean_editor_component_1.BooleanEditorComponent;
var array_editor_component_1 = require("./angular/array-editor.component");
exports.ArrayEditorComponent = array_editor_component_1.ArrayEditorComponent;
var editor_component_1 = require("./angular/editor.component");
exports.EditorComponent = editor_component_1.EditorComponent;
var null_editor_component_1 = require("./angular/null-editor.component");
exports.NullEditorComponent = null_editor_component_1.NullEditorComponent;
var number_editor_component_1 = require("./angular/number-editor.component");
exports.NumberEditorComponent = number_editor_component_1.NumberEditorComponent;
var object_editor_component_1 = require("./angular/object-editor.component");
exports.ObjectEditorComponent = object_editor_component_1.ObjectEditorComponent;
var string_editor_component_1 = require("./angular/string-editor.component");
exports.StringEditorComponent = string_editor_component_1.StringEditorComponent;
var icon_component_1 = require("./angular/icon.component");
exports.IconComponent = icon_component_1.IconComponent;
//# sourceMappingURL=angular.js.map