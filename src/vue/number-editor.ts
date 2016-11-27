import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const numberEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <label v-if="titleToShow" :class="theme.label">
            {{titleToShow}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <div v-if="hasOptionalCheckbox" :class="theme.optionalCheckbox">
                    <label>
                        <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" :disabled="isReadOnly" />
                        {{locale.info.notExists}}
                    </label>
                </div>
                <button v-if="hasDeleteButton" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
            </div>
        </label>
        <input v-if="useInput"
            :class="theme.formControl"
            type="number"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="isReadOnly" />
        <select v-if="useSelect"
            :class="theme.formControl"
            type="number"
            @change="onChange($event)">
            <option v-for="(e, i) in schema.enum"
                :key="i"
                :value="e"
                :selected="value === e">
                {{e}}
            </option>
        </select>
        <p :class="theme.help">{{schema.description}}</p>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number;
        this.$emit("update-value", { value, isValid: !this.errorMessage });
        return {
            value,
            errorMessage: undefined,
            buttonGroupStyle: common.buttonGroupStyleString,
        };
    },
    computed: {
        useInput(this: This) {
            return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly);
        },
        useSelect(this: This) {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly);
        },
        isReadOnly(this: This) {
            return this.readonly || this.schema.readonly;
        },
        hasOptionalCheckbox(this: This) {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        titleToShow(this: This) {
            return common.getTitle(this.title, this.schema.title);
        },
    },
    methods: {
        onChange(this: This, e: { target: { value: string } }) {
            this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        validate(this: This) {
            this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale);
        },
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
    },
};

export type This = {
    $emit: (event: string, args: common.ValidityValue<number | undefined>) => void;
    value?: number;
    errorMessage?: string;
    schema: common.NumberSchema;
    initialValue: number;
    locale: common.Locale;
    validate: () => void;
    readonly: boolean;
    required: boolean;
    isReadOnly: boolean;
    title: string;
};
