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
            template: "\n    <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>\n        <title-editor {...this.props}></title-editor>\n        <div *ngIf=\"!this.required\" className={this.props.theme.optionalCheckbox}>\n            <label>\n                <input type=\"checkbox\" onChange={this.toggleOptional} checked={this.value === undefined} />\n                is undefined\n            </label>\n        </div>\n        <input *ngIf=\"value !== undefined && (schema.enum === undefined || readonly || schema.readonly)\"\n            className={this.props.theme.formControl}\n            type=\"number\"\n            onChange={this.onChange}\n            defaultValue={String(this.value)}\n            readOnly={this.props.readonly || this.props.schema.readonly} />\n        <select *ngIf=\"value !== undefined && (schema.enum !== undefined && !readonly && !schema.readonly)\"\n            className={this.props.theme.formControl}\n            type=\"number\"\n            onChange={this.onChange}\n            defaultValue={String(this.value)} >\n            <option *ngFor=\"let e of schema.enum\" key={i} value={e} >{e}</option>\n        </select>\n        <p className={this.props.theme.help}>{this.props.schema.description}</p>\n        <p *ngIf=\"errorMessage\" className={this.props.theme.help}>{this.errorMessage}</p>\n    </div>\n    ",
        })
    ], NumberEditorComponent);
    return NumberEditorComponent;
}());
exports.NumberEditorComponent = NumberEditorComponent;
//# sourceMappingURL=number-editor.component.js.map