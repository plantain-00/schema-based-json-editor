import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const booleanEditor = {
    template: `
    <div :class="theme.row">
        <title-editor :title="title"
            @onDelete="onDelete()"
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
    props: ["schema", "initialValue", "title", "updateValue", "theme", "icon", "locale", "onDelete", "readonly", "required"],
    data: function () {
        // this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean;
        // this.updateValue.emit(this.value);
        return {
            value: undefined,
        };
    },
    methods: {
        onChange(this: any, e: { target: { checked: boolean } }) {
            this.value = e.target.checked;
            this.updateValue(this.value);
        },
        toggleOptional(this: any) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue === undefined) as boolean;
            } else {
                this.value = undefined;
            }
            this.updateValue(this.value);
        },
    },
};
