import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const nullEditor = {
    template: `
    <div :class="theme.row">
        <title-editor :title="title"
            @delete="$emit('delete')"
            :has-delete-button="hasDeleteButton"
            :theme="theme"
            :icon="icon"
            :locale="locale">
        </title-editor>
        <div v-if="!required" :class="theme.optionalCheckbox">
            <label>
                <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" />
                is undefined
            </label>
        </div>
        <p :class="theme.help">{{schema.description}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null;
        this.$emit("update-value", { value, isValid: true });
        return {
            value,
        };
    },
    methods: {
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined;
            this.$emit("update-value", { value: this.value, isValid: true });
        },
    },
};

export type This = {
    $emit: (event: string, args: common.ValidityValue<null | undefined>) => void;
    value?: null;
    schema: common.NullSchema;
    initialValue: null;
    required: boolean;
}
