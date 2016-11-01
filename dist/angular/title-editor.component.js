"use strict";
var core_1 = require("@angular/core");
var TitleEditorComponent = (function () {
    function TitleEditorComponent() {
        this.onDelete = new core_1.EventEmitter();
    }
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
    TitleEditorComponent = __decorate([
        core_1.Component({
            selector: "title-editor",
            template: "\n    <label *ngIf=\"title\" className={this.props.theme.label}>\n        {this.props.title}\n        <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>\n            <button *ngIf=\"onDelete\" className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>\n        </div>\n    </label>\n    ",
        })
    ], TitleEditorComponent);
    return TitleEditorComponent;
}());
exports.TitleEditorComponent = TitleEditorComponent;
//# sourceMappingURL=title-editor.component.js.map