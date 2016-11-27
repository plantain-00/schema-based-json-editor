import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const objectEditor = {
    template: `
    <div :class="theme.row">
        <h3>
            {{titleToShow}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <div v-if="hasOptionalCheckbox" :class="theme.optionalCheckbox">
                    <label>
                        <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" :disabled="isReadOnly" />
                        {{locale.info.notExists}}
                    </label>
                </div>
                <button :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
                <button v-if="hasDeleteButtonFunction" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
            </div>
        </h3>
        <p :class="theme.help">{{schema.description}}</p>
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
                :readonly="isReadOnly"
                :dragula="dragula"
                :md="md"
                :hljs="hljs"
                :forceHttps="forceHttps">
            </editor>
        </div>
    </div >
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        if (!this.collapsed && value !== undefined) {
            for (const property in this.schema.properties) {
                const schema = this.schema.properties[property];
                const required = this.schema.required && this.schema.required.some((r: any) => r === property);
                value[property] = common.getDefaultValue(required, schema, value[property]) as { [name: string]: common.ValueType };
            }
        }
        this.$emit("update-value", { value, isValid: true });
        return {
            collapsed: false,
            value,
            buttonGroupStyle: common.buttonGroupStyleString,
            invalidProperties: [],
        };
    },
    computed: {
        isReadOnly(this: This) {
            return this.readonly || this.schema.readonly;
        },
        hasDeleteButtonFunction(this: This) {
            return this.hasDeleteButton && !this.isReadOnly;
        },
        hasOptionalCheckbox(this: This) {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        titleToShow(this: This) {
            if (this.hasDeleteButton) {
                return common.getTitle(common.findTitle(this.value), this.title, this.schema.title);
            }
            return common.getTitle(this.title, this.schema.title);
        },
    },
    methods: {
        isRequired(this: This, property: string) {
            return this.schema.required && this.schema.required.some((r: any) => r === property);
        },
        collapseOrExpand(this: This) {
            this.collapsed = !this.collapsed;
        },
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined;
            this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
        },
        onChange(this: This, property: string, {value, isValid}: common.ValidityValue<common.ValueType>) {
            this.value![property] = value;
            common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
            this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
        },
    },
};

export type This = {
    $emit: (event: string, args: common.ValidityValue<{ [name: string]: common.ValueType } | undefined>) => void;
    value?: { [name: string]: common.ValueType };
    collapsed: boolean;
    schema: common.ObjectSchema;
    initialValue: any;
    required: boolean;
    invalidProperties: string[];
    readonly: boolean;
    isReadOnly: boolean;
    hasDeleteButton: boolean;
    title: string;
};
