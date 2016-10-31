"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var BooleanEditorComponent = (function () {
    function BooleanEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        if (this.required) {
            this.value = common.getDefaultValue(this.schema, this.initialValue);
        }
        else {
            this.value = undefined;
        }
        if (this.value !== this.initialValue) {
            this.updateValue.emit(this.value);
        }
    }
    BooleanEditorComponent.prototype.onChange = function (e) {
        this.value = e.target.checked;
        this.updateValue.emit(this.value);
    };
    BooleanEditorComponent.prototype.toggleOptional = function () {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(this.schema, this.initialValue === undefined);
        }
        else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    };
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], BooleanEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], BooleanEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], BooleanEditorComponent.prototype, "required", void 0);
    BooleanEditorComponent = __decorate([
        core_1.Component({
            selector: "boolean-editor",
            template: "\n    <div className={this.props.theme.row}>\n        <title-editor {...this.props} />\n        <div *ngIf=\"!required\" className={this.props.theme.optionalCheckbox}>\n            <label>\n                <input type=\"checkbox\" onChange={this.toggleOptional} checked={this.value === undefined} />\n                is undefined\n            </label>\n        </div>\n        <div *ngIf=\"value !== undefined\" className={this.props.theme.optionalCheckbox}>\n            <label>\n                <input type=\"checkbox\"\n                    onChange={this.onChange}\n                    checked={this.value}\n                    readOnly={this.props.readonly || this.props.schema.readonly} />\n                {this.props.title}\n            </label>\n        </div>\n        <p className={this.props.theme.help}>{this.props.schema.description}</p>\n    </div>\n    ",
        })
    ], BooleanEditorComponent);
    return BooleanEditorComponent;
}());
exports.BooleanEditorComponent = BooleanEditorComponent;
//# sourceMappingURL=boolean-editor.component.js.map