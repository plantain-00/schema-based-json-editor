"use strict";
var React = require("react");
var common = require("./common");
var editor_1 = require("./react/editor");
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
        this.md = common.initializeMarkdown(this.props.markdownit, this.props.hljs, this.props.forceHttps);
    }
    JSONEditor.prototype.render = function () {
        return React.createElement(editor_1.Editor, {schema: this.props.schema, initialValue: this.props.initialValue, updateValue: this.updateValue, readonly: this.props.readonly, theme: this.theme, locale: this.locale, icon: this.icon, required: true, dragula: this.props.dragula, md: this.md, hljs: this.props.hljs, forceHttps: this.props.forceHttps});
    };
    return JSONEditor;
}(React.Component));
exports.JSONEditor = JSONEditor;
//# sourceMappingURL=react.js.map