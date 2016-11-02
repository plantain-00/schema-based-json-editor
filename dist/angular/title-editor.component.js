"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var TitleEditorComponent = (function () {
    function TitleEditorComponent() {
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyle;
    }
    TitleEditorComponent.prototype.deleteThis = function () {
        this.onDelete.emit();
    };
    __decorate([
        core_1.Input()
    ], TitleEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], TitleEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], TitleEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], TitleEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], TitleEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input()
    ], TitleEditorComponent.prototype, "hasDeleteButton", void 0);
    TitleEditorComponent = __decorate([
        core_1.Component({
            selector: "title-editor",
            template: "\n    <label *ngIf=\"title\" [class]=\"theme.label\">\n        {{title}}\n        <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n            <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"deleteThis()\">\n                <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n            </button>\n        </div>\n    </label>\n    ",
        })
    ], TitleEditorComponent);
    return TitleEditorComponent;
}());
exports.TitleEditorComponent = TitleEditorComponent;
//# sourceMappingURL=title-editor.component.js.map