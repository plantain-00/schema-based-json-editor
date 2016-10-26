"use strict";
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var index_component_1 = require("./index.component");
var JSONEditorModule = (function () {
    function JSONEditorModule() {
    }
    JSONEditorModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [index_component_1.JSONEditorComponent],
            bootstrap: [index_component_1.JSONEditorComponent],
        })
    ], JSONEditorModule);
    return JSONEditorModule;
}());
exports.JSONEditorModule = JSONEditorModule;
//# sourceMappingURL=index.module.js.map