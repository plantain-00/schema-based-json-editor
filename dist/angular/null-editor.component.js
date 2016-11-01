"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var NullEditorComponent = (function () {
    function NullEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        // this.updateValue.emit(this.value);
    }
    NullEditorComponent.prototype.toggleOptional = function () {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue);
        }
        else {
            this.value = undefined;
        }
        // this.updateValue.emit(this.value);
    };
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
    NullEditorComponent = __decorate([
        core_1.Component({
            selector: "null-editor",
            template: "\n    <div>\n        <title-editor {...this.props}></title-editor>\n        <div *ngIf=\"!this.required\" className={this.props.theme.optionalCheckbox}>\n            <label>\n                <input type=\"checkbox\" onChange={this.toggleOptional} checked={this.value === undefined} />\n                is undefined\n            </label>\n        </div>\n        <p className={this.props.theme.help}>{this.props.schema.description}</p>\n    </div>\n    ",
        })
    ], NullEditorComponent);
    return NullEditorComponent;
}());
exports.NullEditorComponent = NullEditorComponent;
//# sourceMappingURL=null-editor.component.js.map