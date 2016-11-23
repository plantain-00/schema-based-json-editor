import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const stringEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <label v-if="title !== undefined && title !== null && title !== ''" :class="theme.label">
            {{title}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <button v-if="hasDeleteButton" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
                <button v-if="isImageUrl" :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
            </div>
        </label>
        <div v-if="!required" :class="theme.optionalCheckbox">
            <label>
                <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" />
                is undefined
            </label>
        </div>
        <textarea v-if="useTextArea()"
            :class="theme.formControl"
            @change="onChange($event)"
            @keyup="onChange($event)"
            rows="5"
            :readOnly="readonly || schema.readonly">{{value}}</textarea>
        <input v-if="useInput()"
            :class="theme.formControl"
            :type="schema.format"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="readonly || schema.readonly" />
        <select v-if="useSelect()"
            :class="theme.formControl"
            @change="onChange($event)">
            <option v-for="(e, i) in schema.enum"
                :key="i"
                :value="e"
                :selected="value === e">
                {{e}}
            </option>
        </select>
        <img v-if="isImageUrl && !collapsed" :src="value" />
        <p :class="theme.help">{{schema.description}}</p>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.$emit("update-value", { value, isValid: !this.errorMessage });
        return {
            value,
            errorMessage: undefined,
            isImageUrl: false,
            buttonGroupStyle: common.buttonGroupStyle,
            collapsed: false,
        };
    },
    beforeMount(this: This) {
        this.validate();
    },
    methods: {
        useTextArea(this: This) {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format === "textarea";
        },
        useInput(this: This) {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format !== "textarea";
        },
        useSelect(this: This) {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        onChange(this: This, e: { target: { value: string } }) {
            this.value = e.target.value;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        validate(this: This) {
            this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
            this.isImageUrl = common.isImageUrl(this.value);
        },
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        collapseOrExpand(this: This) {
            this.collapsed = !this.collapsed;
        },
    },
};

export type This = {
    $emit: (event: string, args: common.ValidityValue<common.ValueType | undefined>) => void;
    validate: () => void;
    value?: string;
    errorMessage?: string;
    schema: common.StringSchema;
    initialValue: string;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    isImageUrl: boolean;
    collapsed: boolean;
};
