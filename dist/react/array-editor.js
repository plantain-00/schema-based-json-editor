"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var common = require("../common");
var editor_1 = require("./editor");
var ArrayEditor = (function (_super) {
    __extends(ArrayEditor, _super);
    function ArrayEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.renderSwitch = 1;
        this.collapsed = false;
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
            _this.setState({ collapsed: _this.collapsed }, function () {
                var container = _this.getDragulaContainer();
                _this.drak.containers = [container];
            });
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = common.getDefaultValue(true, _this.props.schema, _this.props.initialValue);
            }
            else {
                _this.value = undefined;
            }
            _this.validate();
            _this.setState({ value: _this.value }, function () {
                var container = _this.getDragulaContainer();
                _this.drak.containers = [container];
            });
            _this.props.updateValue(_this.value);
        };
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue);
        this.validate();
    }
    ArrayEditor.prototype.getDragulaContainer = function () {
        return ReactDOM.findDOMNode(this).childNodes[this.props.required ? 2 : 3];
    };
    ArrayEditor.prototype.componentDidMount = function () {
        var _this = this;
        this.props.updateValue(this.value);
        var container = this.getDragulaContainer();
        this.drak = common.dragula([container]);
        this.drak.on("drop", function (el, target, source, sibling) {
            if (_this.value) {
                var fromIndex = +el.dataset["index"];
                if (sibling) {
                    var toIndex = +sibling.dataset["index"];
                    _this.value.splice(toIndex, 0, _this.value[fromIndex]);
                    if (fromIndex > toIndex) {
                        _this.value.splice(fromIndex + 1, 1);
                    }
                    else {
                        _this.value.splice(fromIndex, 1);
                    }
                }
                else {
                    _this.value.push(_this.value[fromIndex]);
                    _this.value.splice(fromIndex, 1);
                }
                _this.renderSwitch = -_this.renderSwitch;
                _this.setState({ value: _this.value, renderSwitch: _this.renderSwitch });
                _this.props.updateValue(_this.value);
            }
        });
    };
    ArrayEditor.prototype.componentWillUnmount = function () {
        if (this.drak) {
            this.drak.destroy();
        }
    };
    ArrayEditor.prototype.validate = function () {
        if (this.value !== undefined) {
            if (this.props.schema.minItems !== undefined) {
                if (this.value.length < this.props.schema.minItems) {
                    this.errorMessage = this.props.locale.error.minItems.replace("{0}", String(this.props.schema.minItems));
                    return;
                }
            }
            if (this.props.schema.uniqueItems) {
                for (var i = 1; i < this.value.length; i++) {
                    for (var j = 0; j < i; j++) {
                        if (common.isSame(this.value[i], this.value[j])) {
                            this.errorMessage = this.props.locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                            return;
                        }
                    }
                }
            }
        }
        this.errorMessage = "";
    };
    ArrayEditor.prototype.render = function () {
        var _this = this;
        var childrenElement = null;
        if (this.value !== undefined && !this.collapsed) {
            var itemElements = [];
            var _loop_1 = function(i) {
                var onChange = function (value) {
                    _this.value[i] = value;
                    _this.setState({ value: _this.value });
                    _this.props.updateValue(_this.value);
                    _this.validate();
                };
                var onDelete = function () {
                    _this.value.splice(i, 1);
                    _this.renderSwitch = -_this.renderSwitch;
                    _this.setState({ value: _this.value, renderSwitch: _this.renderSwitch });
                    _this.props.updateValue(_this.value);
                    _this.validate();
                };
                var key = (1 + i) * this_1.renderSwitch;
                itemElements.push((React.createElement("div", {key: key, "data-index": i, className: this_1.props.theme.rowContainer}, 
                    React.createElement(editor_1.Editor, {schema: this_1.props.schema.items, title: String(i), initialValue: this_1.value[i], updateValue: onChange, theme: this_1.props.theme, icon: this_1.props.icon, locale: this_1.props.locale, required: true, readonly: this_1.props.readonly || this_1.props.schema.readonly, onDelete: onDelete})
                )));
            };
            var this_1 = this;
            for (var i = 0; i < this.value.length; i++) {
                _loop_1(i);
            }
            childrenElement = (React.createElement("div", {className: this.props.theme.rowContainer}, itemElements));
        }
        var deleteButton = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, this.props.icon.delete);
        }
        var addButton = null;
        if (!this.props.readonly && this.value !== undefined) {
            var addItem = function () {
                _this.value.push(common.getDefaultValue(true, _this.props.schema.items, undefined));
                _this.setState({ value: _this.value });
                _this.props.updateValue(_this.value);
            };
            addButton = React.createElement("button", {className: this.props.theme.button, onClick: addItem}, this.props.icon.add);
        }
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
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
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, this.collapsed ? this.props.icon.expand : this.props.icon.collapse), 
                    addButton, 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            optionalCheckbox, 
            childrenElement, 
            errorDescription));
    };
    return ArrayEditor;
}(React.Component));
exports.ArrayEditor = ArrayEditor;
//# sourceMappingURL=array-editor.js.map