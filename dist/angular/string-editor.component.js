"use strict";
var core_1 = require("@angular/core");
var common = require("../common");
var StringEditorComponent = (function () {
    function StringEditorComponent() {
        var _this = this;
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.buttonGroupStyle = common.buttonGroupStyleString;
        this.collapsed = false;
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.schema, _this.initialValue);
            _this.validate();
            _this.updateValue.emit({ value: _this.value, isValid: !_this.errorMessage });
        };
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
        };
    }
    StringEditorComponent.prototype.ngOnInit = function () {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    };
    Object.defineProperty(StringEditorComponent.prototype, "useTextArea", {
        get: function () {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
                && (this.schema.format === "textarea" || this.schema.format === "code" || this.schema.format === "markdown");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "useInput", {
        get: function () {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
                && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "useSelect", {
        get: function () {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "canPreviewImage", {
        get: function () {
            return common.isImageUrl(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "canPreviewMarkdown", {
        get: function () {
            return this.md && this.schema.format === "markdown";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "canPreviewCode", {
        get: function () {
            return this.hljs && this.schema.format === "code";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "canPreview", {
        get: function () {
            return this.value && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "getImageUrl", {
        get: function () {
            return this.forceHttps ? common.replaceProtocal(this.value) : this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "getMarkdown", {
        get: function () {
            return this.md.render(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditorComponent.prototype, "getCode", {
        get: function () {
            return this.hljs.highlightAuto(this.value).value;
        },
        enumerable: true,
        configurable: true
    });
    StringEditorComponent.prototype.onChange = function (e) {
        this.value = e.target.value;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    };
    StringEditorComponent.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
    };
    StringEditorComponent.prototype.trackByFunction = function (index, value) {
        return index;
    };
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], StringEditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output()
    ], StringEditorComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "hasDeleteButton", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "dragula", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "md", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "hljs", void 0);
    __decorate([
        core_1.Input()
    ], StringEditorComponent.prototype, "forceHttps", void 0);
    StringEditorComponent = __decorate([
        core_1.Component({
            selector: "string-editor",
            styles: [
                (".schema-based-json-editor-image-preview {" + common.imagePreviewStyleString + "}"),
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div [class]=\"errorMessage ? theme.errorRow : theme.row\">\n        <label *ngIf=\"title !== undefined && title !== null && title !== ''\" [class]=\"theme.label\">\n            {{title}}\n            <div [class]=\"theme.buttonGroup\" [style]=\"buttonGroupStyle\">\n                <div *ngIf=\"!required && (value === undefined || !schema.readonly)\" [class]=\"theme.optionalCheckbox\">\n                    <label>\n                        <input type=\"checkbox\" (change)=\"toggleOptional()\" [checked]=\"value === undefined\" [disabled]=\"readonly || schema.readonly\" />\n                        is undefined\n                    </label>\n                </div>\n                <button *ngIf=\"hasDeleteButton\" [class]=\"theme.button\" (click)=\"onDelete.emit()\">\n                    <icon [icon]=\"icon\" [text]=\"icon.delete\"></icon>\n                </button>\n                <button *ngIf=\"canPreview\" [class]=\"theme.button\" (click)=\"collapseOrExpand()\">\n                    <icon [icon]=\"icon\" [text]=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n            </div>\n        </label>\n        <textarea *ngIf=\"useTextArea\"\n            [class]=\"theme.formControl\"\n            (change)=\"onChange($event)\"\n            (keyup)=\"onChange($event)\"\n            rows=\"5\"\n            [readOnly]=\"readonly || schema.readonly\">{{value}}</textarea>\n        <input *ngIf=\"useInput\"\n            [class]=\"theme.formControl\"\n            [type]=\"schema.format\"\n            (change)=\"onChange($event)\"\n            (keyup)=\"onChange($event)\"\n            [defaultValue]=\"value\"\n            [readOnly]=\"readonly || schema.readonly\" />\n        <select *ngIf=\"useSelect\"\n            [class]=\"theme.formControl\"\n            (change)=\"onChange($event)\">\n            <option *ngFor=\"let e of schema.enum; let i = index; trackBy:trackByFunction\"\n                [value]=\"e\"\n                [selected]=\"value === e\">\n                {{e}}\n            </option>\n        </select>\n        <img *ngIf=\"value && !collapsed && canPreviewImage\"\n            class=\"schema-based-json-editor-image-preview\"\n            [src]=\"getImageUrl\" />\n        <div *ngIf=\"value && !collapsed && canPreviewMarkdown\" [innerHTML]=\"getMarkdown\">\n        </div>\n        <pre *ngIf=\"value && !collapsed && canPreviewCode\"><code [innerHTML]=\"getCode\"></code></pre>\n        <p [class]=\"theme.help\">{{schema.description}}</p>\n        <p *ngIf=\"errorMessage\" [class]=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
        })
    ], StringEditorComponent);
    return StringEditorComponent;
}());
exports.StringEditorComponent = StringEditorComponent;
//# sourceMappingURL=string-editor.component.js.map