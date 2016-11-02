"use strict";
var core_1 = require("@angular/core");
var IconComponent = (function () {
    function IconComponent() {
    }
    __decorate([
        core_1.Input()
    ], IconComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], IconComponent.prototype, "text", void 0);
    IconComponent = __decorate([
        core_1.Component({
            selector: "icon",
            template: "\n    <span *ngIf=\"icon.isText\">{{text}}</span>\n    <i *ngIf=\"!icon.isText\" [class]=\"text\"></i>\n    ",
        })
    ], IconComponent);
    return IconComponent;
}());
exports.IconComponent = IconComponent;
//# sourceMappingURL=icon.component.js.map