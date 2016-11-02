"use strict";
var React = require("react");
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        _super.apply(this, arguments);
    }
    Icon.prototype.render = function () {
        if (this.props.icon.isText) {
            return React.createElement("span", null, this.props.text);
        }
        else {
            return React.createElement("i", {className: this.props.text});
        }
    };
    return Icon;
}(React.Component));
exports.Icon = Icon;
//# sourceMappingURL=icon.js.map