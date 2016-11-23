import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const booleanEditor = {
    template: `
    <div :class="theme.row">
        <label v-if="title !== undefined && title !== null && title !== ''" :class="theme.label">
            {{title}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <button v-if="hasDeleteButton" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
            </div>
        </label>
        <div v-if="!required" :class="theme.optionalCheckbox">
            <label>
                <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" />
                is undefined
            </label>
        </div>
        <div v-if="value !== undefined" :class="theme.optionalCheckbox">
            <label>
                <input type="checkbox"
                    @change="onChange($event)"
                    :checked="value"
                    :readOnly="readonly || schema.readonly" />
                {{title}}
            </label>
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
            buttonGroupStyle: common.buttonGroupStyle,
        };
    },
    methods: {
        onChange(this: This, e: { target: { checked: boolean } }) {
            this.value = e.target.checked;
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
};
