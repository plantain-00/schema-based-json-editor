"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var common = require("../common");
var editor_1 = require("./editor");
var icon_1 = require("./icon");
var ArrayEditor = (function (_super) {
    __extends(ArrayEditor, _super);
    function ArrayEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.renderSwitch = 1;
        this.collapsed = false;
        this.invalidIndexes = [];
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
            _this.setState({ collapsed: _this.collapsed });
        };
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.props.schema, _this.props.initialValue);
            _this.validate();
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
        };
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue);
        this.validate();
    }
    ArrayEditor.prototype.componentDidMount = function () {
        var _this = this;
        this.props.updateValue(this.value, !this.errorMessage && this.invalidIndexes.length === 0);
        if (this.props.dragula) {
            var container = ReactDOM.findDOMNode(this).childNodes[2];
            this.drak = this.props.dragula([container]);
            this.drak.on("drop", function (el, target, source, sibling) {
                if (_this.value) {
                    common.switchItem(_this.value, el, sibling);
                    _this.renderSwitch = -_this.renderSwitch;
                    _this.setState({ value: _this.value, renderSwitch: _this.renderSwitch });
                    _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
                }
            });
        }
    };
    ArrayEditor.prototype.componentWillUnmount = function () {
        if (this.drak) {
            this.drak.destroy();
        }
    };
    ArrayEditor.prototype.render = function () {
        var _this = this;
        var childrenElement = null;
        if (this.value !== undefined && !this.collapsed) {
            var itemElements = [];
            var _loop_1 = function(i) {
                var onChange = function (value, isValid) {
                    _this.value[i] = value;
                    _this.setState({ value: _this.value });
                    _this.validate();
                    common.recordInvalidIndexesOfArray(_this.invalidIndexes, isValid, i);
                    _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
                };
                var onDelete = function () {
                    _this.value.splice(i, 1);
                    _this.renderSwitch = -_this.renderSwitch;
                    _this.setState({ value: _this.value, renderSwitch: _this.renderSwitch });
                    _this.validate();
                    _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
                };
                var key = (1 + i) * this_1.renderSwitch;
                itemElements.push((React.createElement("div", {key: key, "data-index": i, className: this_1.props.theme.rowContainer}, 
                    React.createElement(editor_1.Editor, {schema: this_1.props.schema.items, title: String(i), initialValue: this_1.value[i], updateValue: onChange, theme: this_1.props.theme, icon: this_1.props.icon, locale: this_1.props.locale, required: true, readonly: this_1.props.readonly || this_1.props.schema.readonly, onDelete: onDelete, dragula: this_1.props.dragula, md: this_1.props.md, hljs: this_1.props.hljs, forceHttps: this_1.props.forceHttps})
                )));
            };
            var this_1 = this;
            for (var i = 0; i < this.value.length; i++) {
                _loop_1(i);
            }
            childrenElement = (React.createElement("div", {className: this.props.theme.rowContainer}, itemElements));
        }
        else {
            childrenElement = (React.createElement("div", {className: this.props.theme.rowContainer}));
        }
        var deleteButton = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
                React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
            ));
        }
        var addButton = null;
        if (!this.props.readonly && this.value !== undefined) {
            var addItem = function () {
                _this.value.push(common.getDefaultValue(true, _this.props.schema.items, undefined));
                _this.setState({ value: _this.value });
                _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
            };
            addButton = (React.createElement("button", {className: this.props.theme.button, onClick: addItem}, 
                React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.add})
            ));
        }
        var optionalCheckbox = null;
        if (!this.props.required && (this.value === undefined || !this.props.schema.readonly)) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined, disabled: this.props.readonly || this.props.schema.readonly}), 
                    "is undefined")
            ));
        }
        var errorDescription = null;
        if (this.errorMessage) {
            errorDescription = React.createElement("p", {className: this.props.theme.help}, this.errorMessage);
        }
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            React.createElement("h3", null, 
                this.props.title || this.props.schema.title, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                    optionalCheckbox, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
                        React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
                    ), 
                    addButton, 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            childrenElement, 
            errorDescription));
    };
    ArrayEditor.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.props.schema, this.props.locale);
    };
    return ArrayEditor;
}(React.Component));
exports.ArrayEditor = ArrayEditor;
//# sourceMappingURL=array-editor.js.map