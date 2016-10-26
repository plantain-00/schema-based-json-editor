"use strict";
var React = require("react");
var common = require("../common");
var title_editor_1 = require("./title-editor");
var NullEditor = (function (_super) {
    __extends(NullEditor, _super);
    function NullEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = common.getDefaultValue(_this.props.schema, _this.props.initialValue);
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
    }
    NullEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
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
        return (React.createElement("div", null, 
            React.createElement(title_editor_1.TitleEditor, __assign({}, this.props)), 
            optionalCheckbox, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description)));
    };
    return NullEditor;
}(React.Component));
exports.NullEditor = NullEditor;
//# sourceMappingURL=null-editor.js.map