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
        var isReadOnly = this.props.readonly || this.props.schema.readonly;
        var control = null;
        var lockButton = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || isReadOnly) {
                if (this.props.schema.format === "textarea") {
                    control = (React.createElement("textarea", {className: this.props.theme.formControl, onChange: this.onChange, defaultValue: this.value, rows: 5, readOnly: isReadOnly}));
                }
                else if (this.props.schema.format === "code"
                    || this.props.schema.format === "markdown") {
                    if (!this.locked) {
                        control = (React.createElement("textarea", {className: this.props.theme.formControl, onChange: this.onChange, defaultValue: this.value, rows: 5, readOnly: isReadOnly}));
                    }
                    lockButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.toggleLocked}, 
                        React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.locked ? this.props.icon.unlock : this.props.icon.lock})
                    ));
                }
                else {
                    control = (React.createElement("input", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value, readOnly: isReadOnly}));
                }
            }
            else {
                var options = this.props.schema.enum.map(function (e, i) { return React.createElement("option", {key: i, value: e}, e); });
                control = (React.createElement("select", {className: this.props.theme.formControl, onChange: this.onChange, defaultValue: this.value}, options));
            }
        }
        var errorDescription = null;
        if (this.errorMessage) {
            errorDescription = React.createElement("p", {className: this.props.theme.help}, this.errorMessage);
        }
        var optionalCheckbox = null;
        if (!this.props.required && (this.value === undefined || !isReadOnly)) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined, disabled: isReadOnly}), 
                    this.props.locale.info.notExists)
            ));
        }
        var deleteButton = null;
        if (this.props.onDelete) {
            deleteButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
                React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
            ));
        }
        var titleView = null;
        if (this.props.title) {
            titleView = (React.createElement("label", {className: this.props.theme.label}, this.props.title));
        }
        var canPreviewImage = common.isImageUrl(this.value);
        var canPreviewMarkdown = this.props.md && this.props.schema.format === "markdown";
        var canPreviewCode = this.props.hljs && this.props.schema.format === "code";
        var previewButton = null;
        if (this.value && (canPreviewImage || canPreviewMarkdown || canPreviewCode)) {
            previewButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
                React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
            ));
        }
        var imagePreview = null;
        var markdownPreview = null;
        var codePreview = null;
        if (this.value && !this.collapsed) {
            if (canPreviewImage) {
                var url = this.props.forceHttps ? common.replaceProtocal(this.value) : this.value;
                imagePreview = React.createElement("img", {style: common.imagePreviewStyle, src: url});
            }
            else if (canPreviewMarkdown) {
                var html = this.props.md.render(this.value);
                markdownPreview = React.createElement("div", {dangerouslySetInnerHTML: { __html: html }});
            }
            else if (canPreviewCode) {
                var html = this.props.hljs.highlightAuto(this.value).value;
                codePreview = React.createElement("pre", null, 
                    React.createElement("code", {dangerouslySetInnerHTML: { __html: html }})
                );
            }
        }
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            titleView, 
            React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                optionalCheckbox, 
                deleteButton, 
                previewButton, 
                lockButton), 
            control, 
            imagePreview, 
            markdownPreview, 
            codePreview, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            errorDescription));
    };
    StringEditor.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale);
    };
    return StringEditor;
}(React.Component));
exports.StringEditor = StringEditor;
//# sourceMappingURL=string-editor.js.map