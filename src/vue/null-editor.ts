import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const nullEditor = {
    template: `
    <div :class="theme.row">
        <title-editor :title="title"
            @onDelete="$emit('onDelete')"
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
        this.$emit("updateValue", value);
        return {
            value,
        };
    },
    methods: {
        toggleOptional(this: This) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as null;
            } else {
                this.value = undefined;
            }
            this.$emit("updateValue", this.value);
        },
    },
};

export type This = {
    $emit: (event: string, ...args: any[]) => void;
    value?: null;
    schema: any;
    initialValue: null;
    required: boolean;
}
