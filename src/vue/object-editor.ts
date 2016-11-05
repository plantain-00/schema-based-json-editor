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
                <button v-if="hasDeleteButton && !readonly && !schema.readonly" :class="theme.button" @click="$emit('delete')">{{icon.delete}}</button>
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
                :initial-value="value[property]"
                @update-value="onChange(property, arguments[0])"
                :theme="theme"
                :icon="icon"
                :locale="locale"
                :required="isRequired(property)"
                :readonly="readonly || schema.readonly"
                :has-delete-button="hasDeleteButton">
            </editor>
        </div>
    </div >
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        if (!this.collapsed && value !== undefined) {
            for (const property in this.schema.properties) {
                const schema = this.schema.properties[property];
                const required = this.schema.required && this.schema.required.some((r: any) => r === property);
                value[property] = common.getDefaultValue(required, schema, value[property]) as { [name: string]: common.ValueType };
            }
        }
        this.$emit("update-value", value);
        return {
            collapsed: false,
            value,
            buttonGroupStyle: common.buttonGroupStyle,
        };
    },
    methods: {
        isRequired(this: This, property: string) {
            return this.schema.required && this.schema.required.some((r: any) => r === property);
        },
        collapseOrExpand(this: This) {
            this.collapsed = !this.collapsed;
        },
        toggleOptional(this: This) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as { [name: string]: common.ValueType };
            } else {
                this.value = undefined;
            }
            this.$emit("update-value", this.value);
        },
        onChange(this: This, property: string, value: common.ValueType) {
            this.value![property] = value;
            this.$emit("update-value", this.value);
        },
    },
};

export type This = {
    $emit: (event: string, ...args: any[]) => void;
    value?: { [name: string]: common.ValueType };
    collapsed: boolean;
    schema: any;
    initialValue: any;
    required: boolean;
}
