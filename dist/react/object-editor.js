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
        this.onChange = function (property, value, isValid) {
            _this.value[property] = value;
            _this.setState({ value: _this.value });
            common.recordInvalidPropertiesOfObject(_this.invalidProperties, isValid, property);
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
        var childrenElement = [];
        if (!this.collapsed && this.value !== undefined) {
            var _loop_2 = function(property) {
                var schema = this_2.props.schema.properties[property];
                childrenElement.push(React.createElement(editor_1.Editor, {key: property, schema: schema, title: schema.title || property, initialValue: this_2.value[property], updateValue: function (value, isValid) { return _this.onChange(property, value, isValid); }, theme: this_2.props.theme, icon: this_2.props.icon, locale: this_2.props.locale, required: this_2.isRequired(property), readonly: this_2.isReadOnly, dragula: this_2.props.dragula, md: this_2.props.md, hljs: this_2.props.hljs, forceHttps: this_2.props.forceHttps}));
            };
            var this_2 = this;
            for (var property in this.props.schema.properties) {
                _loop_2(property);
            }
        }
        var deleteButton = this.hasDeleteButtonFunction ? (React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, 
            React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.props.icon.delete})
        )) : null;
        var optionalCheckbox = this.hasOptionalCheckbox ? (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
            React.createElement("label", null, 
                React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined, disabled: this.isReadOnly}), 
                this.props.locale.info.notExists)
        )) : null;
        return (React.createElement("div", {className: this.props.theme.row}, 
            React.createElement("h3", null, 
                this.titleToShow, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: common.buttonGroupStyle}, 
                    optionalCheckbox, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, 
                        React.createElement(icon_1.Icon, {icon: this.props.icon, text: this.collapsed ? this.props.icon.expand : this.props.icon.collapse})
                    ), 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            React.createElement("div", {className: this.props.theme.rowContainer}, childrenElement)));
    };
    ObjectEditor.prototype.isRequired = function (property) {
        return this.props.schema.required && this.props.schema.required.some(function (r) { return r === property; });
    };
    Object.defineProperty(ObjectEditor.prototype, "hasDeleteButtonFunction", {
        get: function () {
            return this.props.onDelete && !this.isReadOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectEditor.prototype, "isReadOnly", {
        get: function () {
            return this.props.readonly || this.props.schema.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectEditor.prototype, "hasOptionalCheckbox", {
        get: function () {
            return !this.props.required && (this.value === undefined || !this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectEditor.prototype, "titleToShow", {
        get: function () {
            if (this.props.onDelete) {
                return common.getTitle(common.findTitle(this.value), this.props.title, this.props.schema.title);
            }
            return common.getTitle(this.props.title, this.props.schema.title);
        },
        enumerable: true,
        configurable: true
    });
    return ObjectEditor;
}(React.Component));
exports.ObjectEditor = ObjectEditor;
//# sourceMappingURL=object-editor.js.map