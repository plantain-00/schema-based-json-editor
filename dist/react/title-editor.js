"use strict";
var React = require("react");
var common = require("../common");
var icon_1 = require("./icon");
var TitleEditor = (function (_super) {
    __extends(TitleEditor, _super);
    function TitleEditor() {
        _super.apply(this, arguments);
    }
    TitleEditor.prototype.render = function () {
        if (this.props.title) {
            var deleteButton = null;
            if (this.props.onDelete) {
                deleteButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
                    React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
                ));
            }
            return (React.createElement("label", {className: this.props.theme.label}, 
                this.props.title, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, deleteButton)));
        }
        else {
            return null;
        }
    };
    return TitleEditor;
}(React.Component));
exports.TitleEditor = TitleEditor;
//# sourceMappingURL=title-editor.js.map