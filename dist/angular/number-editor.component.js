"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var NumberEditorComponent = (function () {
    function NumberEditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        // this.updateValue.emit(this.value);
    }
    NumberEditorComponent.prototype.onChange = function (e) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.updateValue.emit(this.value);
    };
    NumberEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
    };
    NumberEditorComponent.prototype.validate = function () {
        if (this.value !== undefined) {
            if (this.schema.minimum !== undefined) {
                if (this.schema.exclusiveMinimum) {
                    if (this.value <= this.schema.minimum) {
                        this.errorMessage = this.locale.error.largerThan.replace("{0}", String(this.schema.minimum));
                        return;
                    }
                }
                else {
                    if (this.value < this.schema.minimum) {
                        this.errorMessage = this.locale.error.minimum.replace("{0}", String(this.schema.minimum));
                        return;
                    }
                }
            }
            if (this.schema.maximum !== undefined) {
                if (this.schema.exclusiveMaximum) {
                    if (this.value >= this.schema.maximum) {
                        this.errorMessage = this.locale.error.smallerThan.replace("{0}", String(this.schema.maximum));
                        return;
                    }
                }
                else {
                    if (this.value > this.schema.maximum) {
                        this.errorMessage = this.locale.error.maximum.replace("{0}", String(this.schema.maximum));
                        return;
                    }
                }
            }
        }
        this.errorMessage = "";
    };
    NumberEditorComponent.prototype.toggleOptional = function () {
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
    ], NumberEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], NumberEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], NumberEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], NumberEditorComponent.prototype, "required", void 0);
    NumberEditorComponent = __decorate([
        core_1.Component({
            selector: "number-editor",
            template: "\n    <div [class]=\"errorMessage ? theme.errorRow : theme.row\">\n        <title-editor></title-editor>\n        <div *ngIf=\"!required\" [class]=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" (change)=\"toggleOptional\" [checked]=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <input *ngIf=\"value !== undefined && (schema.enum === undefined || readonly || schema.readonly)\"\n            [class]=\"theme.formControl\"\n            type=\"number\"\n            (change)=\"onChange\"\n            [defaultValue]=\"value\"\n            [readOnly]=\"readonly || schema.readonly\" />\n        <select *ngIf=\"value !== undefined && (schema.enum !== undefined && !readonly && !schema.readonly)\"\n            [class]=\"theme.formControl\"\n            type=\"number\"\n            (change)=\"onChange\">\n            <option *ngFor=\"let e of schema.enum; let i = index; trackBy:trackByFunction\"\n                [value]=\"e\"\n                [selected]=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <p *ngIf=\"errorMessage\" [class]=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
        })
    ], NumberEditorComponent);
    return NumberEditorComponent;
}());
exports.NumberEditorComponent = NumberEditorComponent;
//# sourceMappingURL=number-editor.component.js.map