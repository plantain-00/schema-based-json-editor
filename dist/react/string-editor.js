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
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue);
        this.validate();
    }
    StringEditor.prototype.componentDidMount = function () {
        this.props.updateValue(this.value, !this.errorMessage);
    };
    StringEditor.prototype.render = function () {
        var control = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                if (this.props.schema.format === "textarea") {
                    control = (React.createElement("textarea", {className: this.props.theme.formControl, onChange: this.onChange, defaultValue: this.value, rows: 5, readOnly: this.props.readonly || this.props.schema.readonly}));
                }
                else {
                    control = (React.createElement("input", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value, readOnly: this.props.readonly || this.props.schema.readonly}));
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
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
            ));
        }
        var imagePreview = null;
        if (this.isImageUrl && !this.collapsed) {
            imagePreview = React.createElement("img", {src: this.value});
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
        var previewImageButton = null;
        if (this.isImageUrl) {
            previewImageButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
                React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
            ));
        }
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            titleView, 
            React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                deleteButton, 
                previewImageButton), 
            optionalCheckbox, 
            control, 
            imagePreview, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            errorDescription));
    };
    StringEditor.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale);
        this.isImageUrl = common.isImageUrl(this.value);
    };
    return StringEditor;
}(React.Component));
exports.StringEditor = StringEditor;
//# sourceMappingURL=string-editor.js.map