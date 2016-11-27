import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const booleanEditor = {
    template: `
    <div :class="theme.row">
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
        <div v-if="value !== undefined">
            <div :class="theme.radiobox">
                <label>
                    <input type="radio"
                        @change="onChange($event)"
                        :checked="value"
                        :disabled="isReadOnly" />
                    true
                </label>
            </div>
            <div :class="theme.radiobox">
                <label>
                    <input type="radio"
                        @change="onChange($event)"
                        :checked="!value"
                        :disabled="isReadOnly" />
                    false
                </label>
            </div>
        </div>
        <p :class="theme.help">{{schema.description}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean;
        this.$emit("update-value", { value, isValid: true });
        return {
            value,
            buttonGroupStyle: common.buttonGroupStyleString,
        };
    },
    computed: {
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
        onChange(this: This, e: { target: { checked: boolean } }) {
            this.value = !this.value;
            this.$emit("update-value", { value: this.value, isValid: true });
        },
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined;
            this.$emit("update-value", { value: this.value, isValid: true });
        },
    },
};

export type This = {
    $emit: (event: string, args: common.ValidityValue<boolean | undefined>) => void;
    required: boolean;
    schema: common.BooleanSchema;
    initialValue: boolean;
    value?: boolean;
    readonly: boolean;
    isReadOnly: boolean;
    title: string;
};
