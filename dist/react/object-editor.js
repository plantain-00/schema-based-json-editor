"use strict";
var React = require("react");
var common = require("../common");
var editor_1 = require("./editor");
var icon_1 = require("./icon");
var ObjectEditor = (function (_super) {
    __extends(ObjectEditor, _super);
    function ObjectEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.collapsed = false;
        this.invalidProperties = [];
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
            _this.setState({ collapsed: _this.collapsed });
        };
        this.toggleOptional = function () {
            _this.value = common.toggleOptional(_this.value, _this.props.schema, _this.props.initialValue);
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value, _this.invalidProperties.length === 0);
        };
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue);
        if (!this.collapsed && this.value !== undefined) {
            var _loop_1 = function(property) {
                var schema = this_1.props.schema.properties[property];
                var required = this_1.props.schema.required && this_1.props.schema.required.some(function (r) { return r === property; });
                this_1.value[property] = common.getDefaultValue(required, schema, this_1.value[property]);
            };
            var this_1 = this;
            for (var property in this.props.schema.properties) {
                _loop_1(property);
            }
        }
    }
    ObjectEditor.prototype.componentDidMount = function () {
        this.props.updateValue(this.value, this.invalidProperties.length === 0);
    };
    ObjectEditor.prototype.render = function () {
        var _this = this;
        var childrenElement = null;
        if (!this.collapsed && this.value !== undefined) {
            var propertyElements = [];
            var _loop_2 = function(property) {
                var onChange = function (value, isValid) {
                    _this.value[property] = value;
                    _this.setState({ value: _this.value });
                    common.recordInvalidPropertiesOfObject(_this.invalidProperties, isValid, property);
                    _this.props.updateValue(_this.value, _this.invalidProperties.length === 0);
                };
                var schema = this_2.props.schema.properties[property];
                var required = this_2.props.schema.required && this_2.props.schema.required.some(function (r) { return r === property; });
                propertyElements.push(React.createElement(editor_1.Editor, {key: property, schema: schema, title: schema.title || property, initialValue: this_2.value[property], updateValue: onChange, theme: this_2.props.theme, icon: this_2.props.icon, locale: this_2.props.locale, required: required, readonly: this_2.props.readonly || this_2.props.schema.readonly}));
            };
            var this_2 = this;
            for (var property in this.props.schema.properties) {
                _loop_2(property);
            }
            childrenElement = (React.createElement("div", {className: this.props.theme.rowContainer}, propertyElements));
        }
        var deleteButton = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
                React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
            ));
        }
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
            ));
        }
        return (React.createElement("div", {className: this.props.theme.row}, 
            React.createElement("h3", null, 
                this.props.title || this.props.schema.title, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
                        React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
                    ), 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            optionalCheckbox, 
            childrenElement));
    };
    return ObjectEditor;
}(React.Component));
exports.ObjectEditor = ObjectEditor;
//# sourceMappingURL=object-editor.js.map