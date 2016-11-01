"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var ObjectEditorComponent = (function () {
    function ObjectEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.collapsed = false;
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
        };
        var this_1 = this;
        for (var property in this.schema.properties) {
            _loop_1(property);
        }
        this.updateValue.emit(this.value);
    }
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
            template: "\n    <div>\n        <h3>\n            {this.props.title || this.props.schema.title}\n            <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>\n                <button className={this.props.theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon.expand : this.props.icon.collapse}</button>\n                <button *ngIf=\"onDelete && !readonly && !schema.readonly\" className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>\n            </div>\n        </h3>\n        <p className={this.props.theme.help}>{this.props.schema.description}</p>\n        <div *ngIf=\"!required\" className={this.props.theme.optionalCheckbox}>\n            <label>\n                <input type=\"checkbox\" onChange={this.toggleOptional} checked={this.value === undefined} />\n                is undefined\n            </label>\n        </div>\n        <div *ngIf=\"!collapsed && value !== undefined\" className={this.props.theme.rowContainer}>\n            <editor *ngFor=\"let property of schema.properties\" key={property}\n                schema={schema}\n                title={schema.title || property}\n                initialValue={this.value[property]}\n                updateValue={onChange}\n                theme={this.props.theme}\n                icon={this.props.icon}\n                locale={this.props.locale}\n                required={required}\n                readonly={this.props.readonly || this.props.schema.readonly}>\n            </editor>\n        </div>\n    </div >\n    ",
        })
    ], ObjectEditorComponent);
    return ObjectEditorComponent;
}());
exports.ObjectEditorComponent = ObjectEditorComponent;
//# sourceMappingURL=object-editor.component.js.map