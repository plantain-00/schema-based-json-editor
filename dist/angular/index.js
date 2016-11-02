"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
exports.icons = {
    "bootstrap3": {
        collapse: "<i className=\"glyphicon glyphicon-chevron-down\"></i>",
        expand: "<i className=\"glyphicon glyphicon-chevron-right\"></i> as string | JSX.Element",
        add: "<i className=\"glyphicon glyphicon-plus\"></i> as string | JSX.Element",
        delete: "<i className=\"glyphicon glyphicon-remove\"></i> as string | JSX.Element",
    },
    "fontawesome4": {
        collapse: "<i className=\"fa fa-caret-square-o-down\"></i>",
        expand: "<i className=\"fa fa-caret-square-o-right\"></i>",
        add: "<i className=\"fa fa-plus\"></i>",
        delete: "<i className=\"fa fa-times\"></i>",
    },
};
var JSONEditorComponent = (function () {
    function JSONEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
    }
    JSONEditorComponent.prototype.ngOnInit = function () {
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
        this.iconObject = common.getIcon(this.icon, this.localeObject, exports.icons);
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
            template: "\n    <object-editor *ngIf=\"schema.type === 'object'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\">\n    </object-editor>\n    <array-editor *ngIf=\"schema.type === 'array'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\">\n    </array-editor>\n    <number-editor *ngIf=\"schema.type === 'number' || schema.type === 'integer'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\">\n    </number-editor>\n    <boolean-editor *ngIf=\"schema.type === 'boolean'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\">\n    </boolean-editor>\n    <null-editor *ngIf=\"schema.type === 'null'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\">\n    </null-editor>\n    <string-editor *ngIf=\"schema.type === 'string'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\"\n        [theme]=\"themeObject\"\n        [locale]=\"localeObject\"\n        [icon]=\"iconObject\">\n    </string-editor>\n    ",
        })
    ], JSONEditorComponent);
    return JSONEditorComponent;
}());
exports.JSONEditorComponent = JSONEditorComponent;
var boolean_editor_component_1 = require("./boolean-editor.component");
exports.BooleanEditorComponent = boolean_editor_component_1.BooleanEditorComponent;
var array_editor_component_1 = require("./array-editor.component");
exports.ArrayEditorComponent = array_editor_component_1.ArrayEditorComponent;
var editor_component_1 = require("./editor.component");
exports.EditorComponent = editor_component_1.EditorComponent;
var null_editor_component_1 = require("./null-editor.component");
exports.NullEditorComponent = null_editor_component_1.NullEditorComponent;
var number_editor_component_1 = require("./number-editor.component");
exports.NumberEditorComponent = number_editor_component_1.NumberEditorComponent;
var object_editor_component_1 = require("./object-editor.component");
exports.ObjectEditorComponent = object_editor_component_1.ObjectEditorComponent;
var string_editor_component_1 = require("./string-editor.component");
exports.StringEditorComponent = string_editor_component_1.StringEditorComponent;
var title_editor_component_1 = require("./title-editor.component");
exports.TitleEditorComponent = title_editor_component_1.TitleEditorComponent;
//# sourceMappingURL=index.js.map