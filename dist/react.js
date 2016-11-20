"use strict";
var React = require("react");
var common = require("./common");
var object_editor_1 = require("./react/object-editor");
var array_editor_1 = require("./react/array-editor");
var number_editor_1 = require("./react/number-editor");
var boolean_editor_1 = require("./react/boolean-editor");
var null_editor_1 = require("./react/null-editor");
var string_editor_1 = require("./react/string-editor");
var JSONEditor = (function (_super) {
    __extends(JSONEditor, _super);
    function JSONEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.updateValue = common.debounce(function (value, isValid) {
            _this.props.updateValue(value, isValid);
        }, 100);
        this.theme = common.getTheme(this.props.theme);
        this.locale = common.getLocale(this.props.locale);
        this.icon = common.getIcon(this.props.icon, this.locale);
    }
    JSONEditor.prototype.render = function () {
        var props = {
            updateValue: this.updateValue,
            readonly: this.props.readonly,
            theme: this.theme,
            locale: this.locale,
            icon: this.icon,
            required: true,
        };
        switch (this.props.schema.type) {
            case "object":
                return React.createElement(object_editor_1.ObjectEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "array":
                return React.createElement(array_editor_1.ArrayEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "number":
            case "integer":
                return React.createElement(number_editor_1.NumberEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "boolean":
                return React.createElement(boolean_editor_1.BooleanEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "null":
                return React.createElement(null_editor_1.NullEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "string":
                return React.createElement(string_editor_1.StringEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            default:
                return null;
        }
    };
    return JSONEditor;
}(React.Component));
exports.JSONEditor = JSONEditor;
//# sourceMappingURL=react.js.map