"use strict";
var common = require("../common");
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */
exports.arrayEditor = {
    template: "\n    <div :class=\"errorMessage ? theme.errorRow : theme.row\">\n        <h3>\n            {{title || schema.title}}\n            <div :class=\"theme.buttonGroup\" :style=\"buttonGroupStyleString\">\n                <button :class=\"theme.button\" @click=\"collapseOrExpand()\">\n                    <icon :icon=\"icon\" :text=\"collapsed ? icon.expand : icon.collapse\"></icon>\n                </button>\n                <button v-if=\"!readonly && value !== undefined\" :class=\"theme.button\" @click=\"addItem()\">\n                    <icon :icon=\"icon\" :text=\"icon.add\"></icon>\n                </button>\n                <button v-if=\"hasDeleteButton && !readonly && !schema.readonly\" :class=\"theme.button\" @click=\"$emit('onDelete')\">\n                    <icon :icon=\"icon\" :text=\"icon.delete\"></icon>\n                </button>\n            </div>\n        </h3>\n        <p :class=\"theme.help\">{{schema.description}}</p>\n        <div v-if=\"!required\" :class=\"theme.optionalCheckbox\">\n            <label>\n                <input type=\"checkbox\" @change=\"toggleOptional()\" :checked=\"value === undefined\" />\n                is undefined\n            </label>\n        </div>\n        <div v-if=\"value !== undefined && !collapsed\" :class=\"theme.rowContainer\">\n            <div v-for=\"(item, i) in value\" :key=\"(1 + i) * renderSwitch\" :data-index=\"i\" :class=\"theme.rowContainer\">\n                <editor :schema=\"schema.items\"\n                    :title=\"i\"\n                    :initial-value=\"value[i]\"\n                    @updateValue=\"onChange(i, arguments[0])\"\n                    :theme=\"theme\"\n                    :icon=\"icon\"\n                    :locale=\"locale\"\n                    :required=\"true\"\n                    :readonly=\"readonly || schema.readonly\"\n                    @onDelete=\"onDeleteFunction(i)\"\n                    :has-delete-button=\"true\">\n                </editor>\n            </div>\n        </div>\n        <p v-if=\"errorMessage\" :class=\"theme.help\">{{errorMessage}}</p>\n    </div>\n    ",
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function () {
        var value = common.getDefaultValue(this.required, this.schema, this.initialValue);
        // this.$emit("updateValue", value);
        // const container = this.getDragulaContainer();
        // this.drak = common.dragula([container]);
        // this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
        //     if (this.value) {
        //         const fromIndex = +el.dataset["index"];
        //         if (sibling) {
        //             const toIndex = +sibling.dataset["index"];
        //             this.value.splice(toIndex, 0, this.value[fromIndex]);
        //             if (fromIndex > toIndex) {
        //                 this.value.splice(fromIndex + 1, 1);
        //             } else {
        //                 this.value.splice(fromIndex, 1);
        //             }
        //         } else {
        //             this.value.push(this.value[fromIndex]);
        //             this.value.splice(fromIndex, 1);
        //         }
        //         this.renderSwitch = -this.renderSwitch;
        //         this.$emit("updateValue", this.value);
        //     }
        // });
        return {
            renderSwitch: 1,
            collapsed: false,
            value: value,
            drak: undefined,
            errorMessage: undefined,
            buttonGroupStyleString: common.buttonGroupStyleString,
        };
    },
    methods: {
        getDragulaContainer: function () {
            return this.drakContainer.nativeElement;
        },
        ngOnDestroy: function () {
            if (this.drak) {
                this.drak.destroy();
            }
        },
        collapseOrExpand: function () {
            this.collapsed = !this.collapsed;
            // const container = this.getDragulaContainer();
            // this.drak.containers = [container];
        },
        toggleOptional: function () {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue);
            }
            else {
                this.value = undefined;
            }
            var container = this.getDragulaContainer();
            this.drak.containers = [container];
            this.$emit("updateValue", this.value);
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
            this.$emit("updateValue", this.value);
        },
        onDeleteFunction: function (i) {
            this.value.splice(i, 1);
            this.renderSwitch = -this.renderSwitch;
            this.$emit("updateValue", this.value);
            this.validate();
        },
        onChange: function (i, value) {
            this.value[i] = value;
            this.$emit("updateValue", this.value);
            this.validate();
        },
    },
};
//# sourceMappingURL=array-editor.js.map