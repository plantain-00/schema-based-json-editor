"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
// import { Editor } from "./editor";
var ArrayEditorComponent = (function () {
    function ArrayEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.renderSwitch = 1;
        this.collapsed = false;
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
            // const container = this.getDragulaContainer();
            // this.drak.containers = [container];
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = common.getDefaultValue(_this.schema, _this.initialValue);
            }
            else {
                _this.value = undefined;
            }
            // const container = this.getDragulaContainer();
            // this.drak.containers = [container];
            _this.updateValue.emit(_this.value);
        };
        if (this.required) {
            this.value = common.getDefaultValue(this.schema, this.initialValue);
        }
        else {
            this.value = undefined;
        }
        if (this.value !== this.initialValue) {
            this.updateValue.emit(this.value);
        }
        // const container = this.getDragulaContainer();
        // this.drak = common.dragula([container]);
        // this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
        //     if (this.value) {
        //         const fromIndex = +el.dataset["index"];
        //         if (sibling) {
        //             const toIndex = +sibling.dataset["index"];
        //             this.value.splice(toIndex, 0, this.value[fromIndex]);
        //             if (fromIndex > toIndex) {
        //                 this.value.splice(fromIndex + 1, 1);
        //             } else {
        //                 this.value.splice(fromIndex, 1);
        //             }
        //         } else {
        //             this.value.push(this.value[fromIndex]);
        //             this.value.splice(fromIndex, 1);
        //         }
        //         this.renderSwitch = -this.renderSwitch;
        //         this.setState({ value: this.value, renderSwitch: this.renderSwitch });
        //         this.props.updateValue(this.value);
        //     }
        // });
    }
    ArrayEditorComponent.prototype.getDragulaContainer = function () {
        // return ReactDOM.findDOMNode(this).childNodes[this.props.required ? 2 : 3] as Element;
    };
    ArrayEditorComponent.prototype.ngOnDestroy = function () {
        if (this.drak) {
            this.drak.destroy();
        }
    };
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], ArrayEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], ArrayEditorComponent.prototype, "required", void 0);
    ArrayEditorComponent = __decorate([
        core_1.Component({
            selector: "array-editor",
            template: "",
        })
    ], ArrayEditorComponent);
    return ArrayEditorComponent;
}());
exports.ArrayEditorComponent = ArrayEditorComponent;
//# sourceMappingURL=array-editor.component.js.map