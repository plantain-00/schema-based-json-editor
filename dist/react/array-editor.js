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
        this.addItem = function () {
            _this.value.push(common.getDefaultValue(true, _this.props.schema.items, undefined));
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
        };
        this.onChange = function (i, value, isValid) {
            _this.value[i] = value;
            _this.setState({ value: _this.value });
            _this.validate();
            common.recordInvalidIndexesOfArray(_this.invalidIndexes, isValid, i);
            _this.props.updateValue(_this.value, !_this.errorMessage && _this.invalidIndexes.length === 0);
        };
        this.onDeleteFunction = function (i) {
            _this.value.splice(i, 1);
            _this.renderSwitch = -_this.renderSwitch;
            _this.setState({ value: _this.value, renderSwitch: _this.renderSwitch });
            _this.validate();
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
        var childrenElement = this.getValue.map(function (e, i) { return (React.createElement("div", {key: (1 + i) * _this.renderSwitch, "data-index": i, className: _this.props.theme.rowContainer}, 
            React.createElement(editor_1.Editor, {schema: _this.props.schema.items, title: String(i), initialValue: _this.getValue[i], updateValue: function (value, isValid) { return _this.onChange(i, value, isValid); }, theme: _this.props.theme, icon: _this.props.icon, locale: _this.props.locale, required: true, readonly: _this.isReadOnly, onDelete: function () { return _this.onDeleteFunction(i); }, dragula: _this.props.dragula, md: _this.props.md, hljs: _this.props.hljs, forceHttps: _this.props.forceHttps})
        )); });
        var deleteButton = this.hasDeleteButton ? (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
            React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
        )) : null;
        var addButton = this.hasAddButton ? (React.createElement("button", {className: this.props.theme.button, onClick: this.addItem}, 
            React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.add})
        )) : null;
        var optionalCheckbox = this.hasOptionalCheckbox ? (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
            React.createElement("label", null, 
                React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined, disabled: this.isReadOnly}), 
                this.props.locale.info.notExists)
        )) : null;
        var errorDescription = this.errorMessage ? React.createElement("p", {className: this.props.theme.help}, this.errorMessage) : null;
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            React.createElement("h3", null, 
                this.titleToShow, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                    optionalCheckbox, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
                        React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
                    ), 
                    addButton, 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            React.createElement("div", {className: this.props.theme.rowContainer}, childrenElement), 
            errorDescription));
    };
    ArrayEditor.prototype.validate = function () {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.props.schema, this.props.locale);
    };
    Object.defineProperty(ArrayEditor.prototype, "isReadOnly", {
        get: function () {
            return this.props.readonly || this.props.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayEditor.prototype, "hasOptionalCheckbox", {
        get: function () {
            return !this.props.required && (this.value === undefined || !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayEditor.prototype, "hasDeleteButton", {
        get: function () {
            return this.props.onDelete && !this.isReadOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayEditor.prototype, "hasAddButton", {
        get: function () {
            return !this.isReadOnly && this.value !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayEditor.prototype, "getValue", {
        get: function () {
            if (this.value !== undefined && !this.collapsed) {
                return this.value;
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayEditor.prototype, "titleToShow", {
        get: function () {
            return common.getTitle(this.props.title, this.props.schema.title);
        },
        enumerable: true,
        configurable: true
    });
    return ArrayEditor;
}(React.Component));
exports.ArrayEditor = ArrayEditor;
//# sourceMappingURL=array-editor.js.map