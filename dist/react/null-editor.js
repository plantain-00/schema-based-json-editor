"use strict";
var React = require("react");
var common = require("../common");
var icon_1 = require("./icon");
var NullEditor = (function (_super) {
    __extends(NullEditor, _super);
    function NullEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.props.schema, _this.props.initialValue);
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value, true);
        };
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue);
    }
    NullEditor.prototype.componentDidMount = function () {
        this.props.updateValue(this.value, true);
    };
    NullEditor.prototype.render = function () {
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
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
        return (React.createElement("div", {className: this.props.theme.row}, 
            titleView, 
            React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, deleteButton), 
            optionalCheckbox, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description)));
    };
    return NullEditor;
}(React.Component));
exports.NullEditor = NullEditor;
//# sourceMappingURL=null-editor.js.map