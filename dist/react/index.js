"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
require("tslib");
var toNumber = require("lodash.tonumber");
var toInteger = require("lodash.tointeger");
var dragula = require("dragula");
exports.themes = {
    "bootstrap3": {
        rowContainer: "well bootstrap3-row-container",
        row: "row",
        formControl: "form-control",
        button: "btn btn-default",
        help: "help-block",
        errorRow: "row has-error",
        label: "control-label",
        optionalCheckbox: "checkbox",
        buttonGroup: "btn-group",
    },
};
var defaultTheme = {
    rowContainer: "",
    row: "",
    formControl: "",
    button: "",
    help: "",
    errorRow: "",
    label: "",
    optionalCheckbox: "",
    buttonGroup: "",
};
function getTheme(name) {
    if (name === undefined) {
        return defaultTheme;
    }
    if (typeof name === "string") {
        return exports.themes[name] || defaultTheme;
    }
    return name;
}
exports.defaultLocale = {
    button: {
        collapse: "Collapse",
        expand: "Expand",
        add: "Add",
        delete: "Delete",
    },
    error: {
        minLength: "Value must be at least {0} characters long.",
        maxLength: "Value must be at most {0} characters long.",
        pattern: "Value doesn't match the pattern {0}.",
        minimum: "Value must be >= {0}.",
        maximum: "Value must be <= {0}.",
        largerThan: "Value must be > {0}.",
        smallerThan: "Value must be < {0}.",
    },
};
exports.locales = {
    "zh-cn": {
        button: {
            collapse: "折叠",
            expand: "显示",
            add: "增加",
            delete: "删除",
        },
        error: {
            minLength: "要求至少 {0} 字符。",
            maxLength: "要求至多 {0} 字符。",
            pattern: "要求匹配模式 {0}。",
            minimum: "要求 >= {0}。",
            maximum: "要求 <= {0}。",
            largerThan: "要求 > {0}。",
            smallerThan: "要求 < {0}。",
        },
    },
};
function getLocale(name) {
    if (name === undefined) {
        return exports.defaultLocale;
    }
    if (typeof name === "string") {
        return exports.locales[name] || exports.defaultLocale;
    }
    return name;
}
exports.icons = {
    "bootstrap3": {
        collapse: React.createElement("i", {className: "glyphicon glyphicon-chevron-down"}),
        expand: React.createElement("i", {className: "glyphicon glyphicon-chevron-right"}),
        add: React.createElement("i", {className: "glyphicon glyphicon-plus"}),
        delete: React.createElement("i", {className: "glyphicon glyphicon-remove"}),
    },
    "fontawesome4": {
        collapse: React.createElement("i", {className: "fa fa-caret-square-o-down"}),
        expand: React.createElement("i", {className: "fa fa-caret-square-o-right"}),
        add: React.createElement("i", {className: "fa fa-plus"}),
        delete: React.createElement("i", {className: "fa fa-times"}),
    },
};
function getIcon(name, locale) {
    if (name === undefined) {
        return {
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    if (typeof name === "string") {
        return exports.icons[name] || {
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    return name;
}
function getDefaultValue(schema, initialValue) {
    if (initialValue !== undefined) {
        return initialValue;
    }
    if (schema.default !== undefined) {
        return schema.default;
    }
    switch (schema.type) {
        case "object":
            return {};
        case "array":
            return [];
        case "number":
        case "integer":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            }
            else {
                return 0;
            }
        case "boolean":
            return false;
        case "string":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            }
            else {
                return "";
            }
        case "null":
        default:
            return null;
    }
}
var buttonGroupStyle = { marginLeft: "10px" };
var TitleEditor = (function (_super) {
    __extends(TitleEditor, _super);
    function TitleEditor() {
        _super.apply(this, arguments);
    }
    TitleEditor.prototype.render = function () {
        if (this.props.title) {
            var deleteButton = null;
            if (this.props.onDelete) {
                deleteButton = React.createElement("button", {className: this.props.theme.button, onClick: this.props.onDelete}, this.props.icon.delete);
            }
            return (React.createElement("label", {className: this.props.theme.label}, 
                this.props.title, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: buttonGroupStyle}, deleteButton)));
        }
        else {
            return null;
        }
    };
    return TitleEditor;
}(React.Component));
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
                _this.value = getDefaultValue(_this.props.schema, _this.props.initialValue);
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue);
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
                this_1.value[property] = getDefaultValue(schema, this_1.value[property]);
                propertyElements.push(React.createElement(Editor, {key: property, schema: schema, title: schema.title || property, initialValue: this_1.value[property], updateValue: onChange, theme: this_1.props.theme, icon: this_1.props.icon, locale: this_1.props.locale, required: this_1.props.schema.required && this_1.props.schema.required.some(function (r) { return r === property; }), readonly: this_1.props.readonly || this_1.props.schema.readonly}));
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
                React.createElement("div", {className: this.props.theme.buttonGroup, style: buttonGroupStyle}, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, this.collapsed ? this.props.icon.expand : this.props.icon.collapse), 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            optionalCheckbox, 
            childrenElement));
    };
    return ObjectEditor;
}(React.Component));
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
                _this.value = getDefaultValue(_this.props.schema, _this.props.initialValue);
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value }, function () {
                var container = _this.getDragulaContainer();
                _this.drak.containers = [container];
            });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue);
        }
        else {
            this.value = undefined;
        }
    }
    ArrayEditor.prototype.getDragulaContainer = function () {
        return ReactDOM.findDOMNode(this).childNodes[this.props.required ? 2 : 3];
    };
    ArrayEditor.prototype.componentDidMount = function () {
        var _this = this;
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
        var container = this.getDragulaContainer();
        this.drak = dragula([container]);
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
    ArrayEditor.prototype.render = function () {
        var _this = this;
        var childrenElement = null;
        if (this.value !== undefined && !this.collapsed) {
            var itemElements = [];
            var _loop_2 = function(i) {
                var onChange = function (value) {
                    _this.value[i] = value;
                    _this.setState({ value: _this.value });
                    _this.props.updateValue(_this.value);
                };
                var onDelete = function () {
                    _this.value.splice(i, 1);
                    _this.renderSwitch = -_this.renderSwitch;
                    _this.setState({ value: _this.value, renderSwitch: _this.renderSwitch });
                    _this.props.updateValue(_this.value);
                };
                var key = (1 + i) * this_2.renderSwitch;
                itemElements.push((React.createElement("div", {key: key, "data-index": i, className: this_2.props.theme.rowContainer}, 
                    React.createElement(Editor, {schema: this_2.props.schema.items, title: String(i), initialValue: this_2.value[i], updateValue: onChange, theme: this_2.props.theme, icon: this_2.props.icon, locale: this_2.props.locale, required: true, readonly: this_2.props.readonly || this_2.props.schema.readonly, onDelete: onDelete})
                )));
            };
            var this_2 = this;
            for (var i = 0; i < this.value.length; i++) {
                _loop_2(i);
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
                _this.value.push(getDefaultValue(_this.props.schema.items, undefined));
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
        return (React.createElement("div", null, 
            React.createElement("h3", null, 
                this.props.title || this.props.schema.title, 
                React.createElement("div", {className: this.props.theme.buttonGroup, style: buttonGroupStyle}, 
                    React.createElement("button", {className: this.props.theme.button, onClick: this.collapseOrExpand}, this.collapsed ? this.props.icon.expand : this.props.icon.collapse), 
                    addButton, 
                    deleteButton)), 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            optionalCheckbox, 
            childrenElement));
    };
    return ArrayEditor;
}(React.Component));
var NumberEditor = (function (_super) {
    __extends(NumberEditor, _super);
    function NumberEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.onChange = function (e) {
            _this.value = _this.props.schema.type === "integer" ? toInteger(e.target.value) : toNumber(e.target.value);
            _this.validate();
            _this.props.updateValue(_this.value);
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = getDefaultValue(_this.props.schema, _this.props.initialValue);
                _this.validate();
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue);
        }
        else {
            this.value = undefined;
        }
        this.validate();
    }
    NumberEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    };
    NumberEditor.prototype.validate = function () {
        if (this.value !== undefined) {
            if (this.props.schema.minimum !== undefined) {
                if (this.props.schema.exclusiveMinimum) {
                    if (this.value <= this.props.schema.minimum) {
                        this.errorMessage = this.props.locale.error.largerThan.replace("{0}", String(this.props.schema.minimum));
                        return;
                    }
                }
                else {
                    if (this.value < this.props.schema.minimum) {
                        this.errorMessage = this.props.locale.error.minimum.replace("{0}", String(this.props.schema.minimum));
                        return;
                    }
                }
            }
            if (this.props.schema.maximum !== undefined) {
                if (this.props.schema.exclusiveMaximum) {
                    if (this.value >= this.props.schema.maximum) {
                        this.errorMessage = this.props.locale.error.smallerThan.replace("{0}", String(this.props.schema.maximum));
                        return;
                    }
                }
                else {
                    if (this.value > this.props.schema.maximum) {
                        this.errorMessage = this.props.locale.error.maximum.replace("{0}", String(this.props.schema.maximum));
                        return;
                    }
                }
            }
        }
        this.errorMessage = "";
    };
    NumberEditor.prototype.render = function () {
        var control = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                control = (React.createElement("input", {className: this.props.theme.formControl, type: "number", onChange: this.onChange, defaultValue: String(this.value), readOnly: this.props.readonly || this.props.schema.readonly}));
            }
            else {
                var options = this.props.schema.enum.map(function (e, i) { return React.createElement("option", {key: i, value: e}, e); });
                control = (React.createElement("select", {className: this.props.theme.formControl, type: "number", onChange: this.onChange, defaultValue: String(this.value)}, options));
            }
        }
        var errorDescription = null;
        if (this.errorMessage) {
            errorDescription = React.createElement("p", {className: this.errorMessage}, this.props.schema.description);
        }
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
            ));
        }
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            React.createElement(TitleEditor, __assign({}, this.props)), 
            optionalCheckbox, 
            control, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            errorDescription));
    };
    return NumberEditor;
}(React.Component));
var BooleanEditor = (function (_super) {
    __extends(BooleanEditor, _super);
    function BooleanEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.onChange = function (e) {
            _this.value = e.target.checked;
            _this.props.updateValue(_this.value);
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = getDefaultValue(_this.props.schema, _this.props.initialValue === undefined);
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue);
        }
        else {
            this.value = undefined;
        }
    }
    BooleanEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    };
    BooleanEditor.prototype.render = function () {
        var control = null;
        if (this.value !== undefined) {
            control = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.onChange, checked: this.value, readOnly: this.props.readonly || this.props.schema.readonly}), 
                    this.props.title)
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
            React.createElement(TitleEditor, __assign({}, this.props)), 
            optionalCheckbox, 
            control, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description)));
    };
    return BooleanEditor;
}(React.Component));
var NullEditor = (function (_super) {
    __extends(NullEditor, _super);
    function NullEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = getDefaultValue(_this.props.schema, _this.props.initialValue);
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue);
        }
        else {
            this.value = undefined;
        }
    }
    NullEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    };
    NullEditor.prototype.render = function () {
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
            ));
        }
        return (React.createElement("div", null, 
            React.createElement(TitleEditor, __assign({}, this.props)), 
            optionalCheckbox, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description)));
    };
    return NullEditor;
}(React.Component));
var StringEditor = (function (_super) {
    __extends(StringEditor, _super);
    function StringEditor(props) {
        var _this = this;
        _super.call(this, props);
        this.onChange = function (e) {
            _this.value = e.target.value;
            _this.validate();
            _this.props.updateValue(_this.value);
        };
        this.toggleOptional = function () {
            if (_this.value === undefined) {
                _this.value = getDefaultValue(_this.props.schema, _this.props.initialValue);
                _this.validate();
            }
            else {
                _this.value = undefined;
            }
            _this.setState({ value: _this.value });
            _this.props.updateValue(_this.value);
        };
        if (this.props.required) {
            this.value = getDefaultValue(this.props.schema, this.props.initialValue);
        }
        else {
            this.value = undefined;
        }
        this.validate();
    }
    StringEditor.prototype.componentDidMount = function () {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    };
    StringEditor.prototype.validate = function () {
        if (this.value !== undefined) {
            if (this.props.schema.minLength !== undefined
                && this.value.length < this.props.schema.minLength) {
                this.errorMessage = this.props.locale.error.minLength.replace("{0}", String(this.props.schema.minLength));
                return;
            }
            if (this.props.schema.maxLength !== undefined
                && this.value.length > this.props.schema.maxLength) {
                this.errorMessage = this.props.locale.error.maxLength.replace("{0}", String(this.props.schema.maxLength));
                return;
            }
            if (this.props.schema.pattern !== undefined
                && !this.value.match(this.props.schema.pattern)) {
                this.errorMessage = this.props.locale.error.pattern.replace("{0}", String(this.props.schema.pattern));
                return;
            }
        }
        this.errorMessage = "";
    };
    StringEditor.prototype.render = function () {
        var control = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                control = (React.createElement("input", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value, readOnly: this.props.readonly || this.props.schema.readonly}));
            }
            else {
                var options = this.props.schema.enum.map(function (e, i) { return React.createElement("option", {key: i, value: e}, e); });
                control = (React.createElement("select", {className: this.props.theme.formControl, type: this.props.schema.format, onChange: this.onChange, defaultValue: this.value}, options));
            }
        }
        var errorDescription = null;
        if (this.errorMessage) {
            errorDescription = React.createElement("p", {className: this.errorMessage}, this.props.schema.description);
        }
        var optionalCheckbox = null;
        if (!this.props.required) {
            optionalCheckbox = (React.createElement("div", {className: this.props.theme.optionalCheckbox}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "checkbox", onChange: this.toggleOptional, checked: this.value === undefined}), 
                    "is undefined")
            ));
        }
        return (React.createElement("div", {className: this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}, 
            React.createElement(TitleEditor, __assign({}, this.props)), 
            optionalCheckbox, 
            control, 
            React.createElement("p", {className: this.props.theme.help}, this.props.schema.description), 
            errorDescription));
    };
    return StringEditor;
}(React.Component));
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        _super.apply(this, arguments);
    }
    Editor.prototype.render = function () {
        switch (this.props.schema.type) {
            case "object":
                return React.createElement(ObjectEditor, __assign({}, this.props));
            case "array":
                return React.createElement(ArrayEditor, __assign({}, this.props));
            case "number":
            case "integer":
                return React.createElement(NumberEditor, __assign({}, this.props));
            case "boolean":
                return React.createElement(BooleanEditor, __assign({}, this.props));
            case "null":
                return React.createElement(NullEditor, __assign({}, this.props));
            case "string":
                return React.createElement(StringEditor, __assign({}, this.props));
            default:
                return null;
        }
    };
    return Editor;
}(React.Component));
var JSONEditor = (function (_super) {
    __extends(JSONEditor, _super);
    function JSONEditor() {
        _super.apply(this, arguments);
    }
    JSONEditor.prototype.render = function () {
        var theme = getTheme(this.props.theme);
        var locale = getLocale(this.props.locale);
        var icon = getIcon(this.props.icon, locale);
        var props = {
            updateValue: this.props.updateValue,
            readonly: this.props.readonly,
            theme: theme,
            locale: locale,
            icon: icon,
            required: true,
        };
        switch (this.props.schema.type) {
            case "object":
                return React.createElement(ObjectEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "array":
                return React.createElement(ArrayEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "number":
            case "integer":
                return React.createElement(NumberEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "boolean":
                return React.createElement(BooleanEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "null":
                return React.createElement(NullEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            case "string":
                return React.createElement(StringEditor, __assign({schema: this.props.schema, initialValue: this.props.initialValue}, props));
            default:
                return null;
        }
    };
    return JSONEditor;
}(React.Component));
exports.JSONEditor = JSONEditor;
//# sourceMappingURL=index.js.map