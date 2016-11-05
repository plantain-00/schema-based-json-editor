import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const objectEditor = {
    template: `
    <div :class="theme.row">
        <h3>
            {{title || schema.title}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <button :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
                <button v-if="hasDeleteButton && !readonly && !schema.readonly" :class="theme.button" @click="$emit('onDelete')">{{icon.delete}}</button>
            </div>
        </h3>
        <p :class="theme.help">{{schema.description}}</p>
        <div v-if="!required" :class="theme.optionalCheckbox">
            <label>
                <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" />
                is undefined
            </label>
        </div>
        <div v-if="!collapsed && value !== undefined" :class="theme.rowContainer">
            <editor v-for="(propertySchema, property, i) in schema.properties"
                :key="i"
                :schema="propertySchema"
                :title="propertySchema.title || property"
                :initialValue="value[property]"
                @updateValue="onChange(property, $event)"
                :theme="theme"
                :icon="icon"
                :locale="locale"
                :required="isRequired(property)"
                :readonly="readonly || schema.readonly"
                :hasDeleteButton="hasDeleteButton">
            </editor>
        </div>
    </div >
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function (this: any) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        if (!this.collapsed && value !== undefined) {
            for (const property in this.schema.properties) {
                const schema = this.schema.properties[property];
                const required = this.schema.required && this.schema.required.some((r: any) => r === property);
                value[property] = common.getDefaultValue(required, schema, value[property]) as { [name: string]: common.ValueType };
            }
        }
        // this.$emit("updateValue", this.value);
        return {
            collapsed: false,
            value,
            buttonGroupStyle: common.buttonGroupStyle,
        };
    },
    methods: {
        isRequired(this: any, property: string) {
            return this.schema.required && this.schema.required.some((r: any) => r === property);
        },
        collapseOrExpand(this: any) {
            this.collapsed = !this.collapsed;
        },
        toggleOptional(this: any) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as { [name: string]: common.ValueType };
            } else {
                this.value = undefined;
            }
            this.$emit("updateValue", this.value);
        },
        onChange(this: any, property: string, value: common.ValueType) {
            this.value![property] = value;
            this.$emit("updateValue", this.value);
        },
    },
};
