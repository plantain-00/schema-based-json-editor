"use strict";
var Vue = require("vue");
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.arrayEditor = {
    template: "\n    <div :class=\"errorMessage ? theme.errorRow : theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyleString\">\n                <button :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button v-if=\"!readonly && value !== undefined\" :class=\"theme.button\" @click=\"addItem()\">\n                    <icon :icon=\"icon\" :text=\"icon.add\"></icon>\n                </button>\n                <button v-if=\"hasDeleteButton && !readonly && !schema.readonly\" :class=\"theme.button\" @click=\"$emit('delete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </h3>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div v-if=\"value !== undefined && !collapsed\" :class=\"theme.rowContainer\">\n            <div v-for=\"(item, i) in value\" :key=\"(1 + i) * renderSwitch\" :data-index=\"i\" :class=\"theme.rowContainer\">\n                <editor :schema=\"schema.items\"\n                    :title=\"i\"\n                    :initial-value=\"value[i]\"\n                    @update-value=\"onChange(i, arguments[0])\"\n                    :theme=\"theme\"\n                    :icon=\"icon\"\n                    :locale=\"locale\"\n                    :required=\"true\"\n                    :readonly=\"readonly || schema.readonly\"\n                    @delete=\"onDeleteFunction(i)\"\n                    :has-delete-button=\"true\">\n                </editor>\n            </div>\n        </div>\n        <p v-if=\"errorMessage\" :class=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        this.$emit("update-value", value);
        return {
            renderSwitch: 1,
            collapsed: false,
            value: value,
            drak: undefined,
            errorMessage: undefined,
            buttonGroupStyleString: common.buttonGroupStyleString,
        };
    },
    beforeDestroy: function () {
        if (this.drak) {
            this.drak.destroy();
        }
    },
    mounted: function () {
        var _this = this;
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
                _this.$emit("update-value", _this.value);
            }
        });
    },
    methods: {
        getDragulaContainer: function () {
            return this.$el.childNodes[6];
        },
        collapseOrExpand: function () {
            var _this = this;
            this.collapsed = !this.collapsed;
            Vue.nextTick(function () {
                var container = _this.getDragulaContainer();
                if (container) {
                    _this.drak.containers = [container];
                }
            });
        },
        toggleOptional: function () {
            var _this = this;
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue);
            }
            else {
                this.value = undefined;
            }
            Vue.nextTick(function () {
                var container = _this.getDragulaContainer();
                if (container) {
                    _this.drak.containers = [container];
                }
            });
            this.$emit("update-value", this.value);
        },
        validate: function () {
            if (this.value !== undefined) {
                if (this.schema.minItems !== undefined) {
                    if (this.value.length < this.schema.minItems) {
                        this.errorMessage = this.locale.error.minItems.replace("{0}", String(this.schema.minItems));
                        return;
                    }
                }
                if (this.schema.uniqueItems) {
                    for (var i = 1; i < this.value.length; i++) {
                        for (var j = 0; j < i; j++) {
                            if (common.isSame(this.value[i], this.value[j])) {
                                this.errorMessage = this.locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                                return;
                            }
                        }
                    }
                }
            }
            this.errorMessage = "";
        },
        addItem: function () {
            this.value.push(common.getDefaultValue(true, this.schema.items, undefined));
            this.$emit("update-value", this.value);
        },
        onDeleteFunction: function (i) {
            this.value.splice(i, 1);
            this.renderSwitch = -this.renderSwitch;
            this.$emit("update-value", this.value);
            this.validate();
        },
        onChange: function (i, value) {
            this.value[i] = value;
            this.$emit("update-value", this.value);
            this.validate();
        },
    },
};
//# sourceMappingURL=array-editor.js.map