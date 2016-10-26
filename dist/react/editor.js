"use strict";
var React = require("react");
var object_editor_1 = require("./object-editor");
var array_editor_1 = require("./array-editor");
var number_editor_1 = require("./number-editor");
var boolean_editor_1 = require("./boolean-editor");
var null_editor_1 = require("./null-editor");
var string_editor_1 = require("./string-editor");
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        _super.apply(this, arguments);
    }
    Editor.prototype.render = function () {
        switch (this.props.schema.type) {
            case "object":
                return React.createElement(object_editor_1.ObjectEditor, __assign({}, this.props));
            case "array":
                return React.createElement(array_editor_1.ArrayEditor, __assign({}, this.props));
            case "number":
            case "integer":
                return React.createElement(number_editor_1.NumberEditor, __assign({}, this.props));
            case "boolean":
                return React.createElement(boolean_editor_1.BooleanEditor, __assign({}, this.props));
            case "null":
                return React.createElement(null_editor_1.NullEditor, __assign({}, this.props));
            case "string":
                return React.createElement(string_editor_1.StringEditor, __assign({}, this.props));
            default:
                return null;
        }
    };
    return Editor;
}(React.Component));
exports.Editor = Editor;
//# sourceMappingURL=editor.js.map