"use strict";
var React = require("react");
var common = require("../common");
var icon_1 = require("./icon");
var StringEditor = (function (_super) {
    __extends(StringEditor, _super);
    function StringEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.collapsed = false;
        this.locked = true;
        this.onChange = function (e) {
            _this.value = e.currentTarget.value;
            _this.validate();
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value, !_this.errorMessage);
        };
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.props.schema, _this.props.initialValue);
            _this.validate();
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value, !_this.errorMessage);
        };
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
            _this.setState({ collapsed: _this.collapsed });
        };
        this.toggleLocked = function () {
            _this.locked = !_this.locked;
            _this.setState({ locked: _this.locked });
        };
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue);
        this.validate();
    }
    StringEditor.prototype.componentDidMount = function () {
        this.props.updateValue(this.value, !this.errorMessage);
    };
    StringEditor.prototype.render = function () {
        var textarea = this.useTextArea ? (React.createElement("textarea", {className: this.props.theme.formControl, onChange: this.onChange, defaultValue: this.value, rows: 5, readOnly: this.isReadOnly})) : null;
        var input = this.useInput ? (React.createElement("input", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value, readOnly: this.isReadOnly})) : null;
        var select = this.useSelect ? (React.createElement("select", {className: this.props.theme.formControl, onChange: this.onChange, defaultValue: this.value}, this.props.schema.enum.map(function (e, i) { return React.createElement("option", {key: i, value: e}, e); }))) : null;
        var lockButton = this.hasLockButton ? (React.createElement("button", {className: this.props.theme.button, onClick: this.toggleLocked}, 
            React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.locked ? this.props.icon.unlock : this.props.icon.lock})
        )) : null;
        var errorDescription = this.errorMessage ? React.createElement("p", {className: this.props.theme.help}, this.errorMessage) : null;
        var optionalCheckbox = this.hasOptionalCheckbox ? (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
            React.createElement("label", null, 
                React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined, disabled: this.isReadOnly}), 
                this.props.locale.info.notExists)
        )) : null;
        var deleteButton = this.props.onDelete ? (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
            React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
        )) : null;
        var titleView = this.props.title ? (React.createElement("label", {className: this.props.theme.label}, this.titleToShow)) : null;
        var previewButton = this.canPreview ? (React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
            React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
        )) : null;
        var imagePreview = this.willPreviewImage ? React.createElement("img", {style: common.imagePreviewStyle, src: this.getImageUrl}) : null;
        var markdownPreview = this.willPreviewMarkdown ? React.createElement("div", {dangerouslySetInnerHTML: { __html: this.getMarkdown }}) : null;
        var codePreview = this.willPreviewCode ? React.createElement("pre", null, 
            React.createElement("code", {dangerouslySetInnerHTML: { __html: this.getCode }})
        ) : null;
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            titleView, 
            React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                optionalCheckbox, 
                deleteButton, 
                previewButton, 
                lockButton), 
            textarea, 
            input, 
            select, 
            imagePreview, 
            markdownPreview, 
            codePreview, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            errorDescription));
    };
    Object.defineProperty(StringEditor.prototype, "isReadOnly", {
        get: function () {
            return this.props.readonly || this.props.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "useTextArea", {
        get: function () {
            var isUnlockedCodeOrMarkdown = (this.props.schema.format === "code" || this.props.schema.format === "markdown") && (!this.locked);
            return this.value !== undefined
                && (this.props.schema.enum === undefined || this.isReadOnly)
                && (this.props.schema.format === "textarea" || isUnlockedCodeOrMarkdown);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "useInput", {
        get: function () {
            return this.value !== undefined
                && (this.props.schema.enum === undefined || this.isReadOnly)
                && (this.props.schema.format !== "textarea" && this.props.schema.format !== "code" && this.props.schema.format !== "markdown");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "useSelect", {
        get: function () {
            return this.value !== undefined && this.props.schema.enum !== undefined && !this.isReadOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "hasLockButton", {
        get: function () {
            return this.value !== undefined
                && (this.props.schema.enum === undefined || this.isReadOnly)
                && (this.props.schema.format === "code" || this.props.schema.format === "markdown");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "hasOptionalCheckbox", {
        get: function () {
            return !this.props.required && (this.value === undefined || !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "canPreviewImage", {
        get: function () {
            return common.isImageUrl(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "canPreviewMarkdown", {
        get: function () {
            return this.props.md && this.props.schema.format === "markdown";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "canPreviewCode", {
        get: function () {
            return this.props.hljs && this.props.schema.format === "code";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "canPreview", {
        get: function () {
            return this.value && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "getImageUrl", {
        get: function () {
            return this.props.forceHttps ? common.replaceProtocal(this.value) : this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "getMarkdown", {
        get: function () {
            return this.props.md.render(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "getCode", {
        get: function () {
            return this.props.hljs.highlightAuto(this.value).value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "willPreviewImage", {
        get: function () {
            return this.value && !this.collapsed && this.canPreviewImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "willPreviewMarkdown", {
        get: function () {
            return this.value && !this.collapsed && this.canPreviewMarkdown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "willPreviewCode", {
        get: function () {
            return this.value && !this.collapsed && this.canPreviewCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringEditor.prototype, "titleToShow", {
        get: function () {
            return common.getTitle(this.props.title, this.props.schema.title);
        },
        enumerable: true,
        configurable: true
    });
    StringEditor.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale);
    };
    return StringEditor;
}(React.Component));
exports.StringEditor = StringEditor;
//# sourceMappingURL=string-editor.js.map