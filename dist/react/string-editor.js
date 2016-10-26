"use strict";
var React = require("react");
var common = require("../common");
var title_editor_1 = require("./title-editor");
var StringEditor = (function (_super) {
    __extends(StringEditor, _super);
    function StringEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.onChange = function (e) {
            _this.value = e.target.value;
            _this.validate();
            _this.props.updateValue(_this.value);
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = common.getDefaultValue(_this.props.schema, _this.props.initialValue);
                _this.validate();
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = common.getDefaultValue(this.props.schema, this.props.initialValue);
        }
        else {
            this.value = undefined;
        }
        this.validate();
    }
    StringEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    };
    StringEditor.prototype.validate = function () {
        if (this.value !== undefined) {
            if (this.props.schema.minLength !== undefined
                && this.value.length < this.props.schema.minLength) {
                this.errorMessage = this.props.locale.error.minLength.replace("{0}", String(this.props.schema.minLength));
                return;
            }
            if (this.props.schema.maxLength !== undefined
                && this.value.length > this.props.schema.maxLength) {
                this.errorMessage = this.props.locale.error.maxLength.replace("{0}", String(this.props.schema.maxLength));
                return;
            }
            if (this.props.schema.pattern !== undefined
                && !this.value.match(this.props.schema.pattern)) {
                this.errorMessage = this.props.locale.error.pattern.replace("{0}", String(this.props.schema.pattern));
                return;
            }
        }
        this.errorMessage = "";
    };
    StringEditor.prototype.render = function () {
        var control = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                control = (React.createElement("input", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value, readOnly: this.props.readonly || this.props.schema.readonly}));
            }
            else {
                var options = this.props.schema.enum.map(function (e, i) { return React.createElement("option", {key: i, value: e}, e); });
                control = (React.createElement("select", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value}, options));
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
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            React.createElement(title_editor_1.TitleEditor, __assign({}, this.props)), 
            optionalCheckbox, 
            control, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            errorDescription));
    };
    return StringEditor;
}(React.Component));
exports.StringEditor = StringEditor;
//# sourceMappingURL=string-editor.js.map