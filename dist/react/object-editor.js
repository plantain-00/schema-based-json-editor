"use strict";
var React = require("react");
var common = require("../common");
var editor_1 = require("./editor");
var ObjectEditor = (function (_super) {
    __extends(ObjectEditor, _super);
    function ObjectEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.collapsed = false;
        this.collapseOrExpand = function () {
            _this.collapsed = !_this.collapsed;
            _this.setState({ collapsed: _this.collapsed });
        };
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
    ObjectEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    };
    ObjectEditor.prototype.render = function () {
        var _this = this;
        var childrenElement = null;
        if (!this.collapsed && this.value !== undefined) {
            var propertyElements = [];
            var _loop_1 = function(property) {
                var onChange = function (value) {
                    _this.value[property] = value;
                    _this.setState({ value: _this.value });
                    _this.props.updateValue(_this.value);
                };
                var schema = this_1.props.schema.properties[property];
                this_1.value[property] = common.getDefaultValue(schema, this_1.value[property]);
                propertyElements.push(React.createElement(editor_1.Editor, {key: property, schema: schema, title: schema.title || property, initialValue: this_1.value[property], updateValue: onChange, theme: this_1.props.theme, icon: this_1.props.icon, locale: this_1.props.locale, required: this_1.props.schema.required && this_1.props.schema.required.some(function (r) { return r === property; }), readonly: this_1.props.readonly || this_1.props.schema.readonly}));
            };
            var this_1 = this;
            for (var property in this.props.schema.properties) {
                _loop_1(property);
            }
            childrenElement = (React.createElement("div", {className: this.props.theme.rowContainer}, propertyElements));
        }
        var deleteButton = null;
        if (this.props.onDelete && !this.props.readonly && !this.props.schema.readonly) {
            deleteButton = React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, this.props.icon.delete);
        }
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
            ));
        }
        return (React.createElement("div", null, 
            React.createElement("h3", null, 
                this.props.title || this.props.schema.title, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, this.collapsed ? this.props.icon.expand : this.props.icon.collapse), 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            optionalCheckbox, 
            childrenElement));
    };
    return ObjectEditor;
}(React.Component));
exports.ObjectEditor = ObjectEditor;
//# sourceMappingURL=object-editor.js.map