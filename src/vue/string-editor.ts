import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const stringEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
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
            :defaultValue="value"
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
        <p :class="theme.help">{{schema.description}}</p>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "updateValue", "theme", "icon", "locale", "onDelete", "readonly", "required"],
    data: function (this: any) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        // this.validate();
        // this.updateValue.emit(this.value);
        return {
            value,
            errorMessage: undefined,
        };
    },
    methods: {
        useTextArea(this: any) {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format === "textarea";
        },
        useInput(this: any) {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format !== "textarea";
        },
        useSelect(this: any) {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        onChange(this: any, e: { target: { value: string } }) {
            this.value = e.target.value;
            this.validate();
            this.updateValue(this.value);
        },
        validate(this: any) {
            if (this.value !== undefined) {
                if (this.schema.minLength !== undefined
                    && this.value.length < this.schema.minLength) {
                    this.errorMessage = this.locale.error.minLength.replace("{0}", String(this.schema.minLength));
                    return;
                }
                if (this.schema.maxLength !== undefined
                    && this.value.length > this.schema.maxLength) {
                    this.errorMessage = this.locale.error.maxLength.replace("{0}", String(this.schema.maxLength));
                    return;
                }
                if (this.schema.pattern !== undefined
                    && !new RegExp(this.schema.pattern).test(this.value)) {
                    this.errorMessage = this.locale.error.pattern.replace("{0}", String(this.schema.pattern));
                    return;
                }
            }

            this.errorMessage = "";
        },
        toggleOptional(this: any) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as string;
                this.validate();
            } else {
                this.value = undefined;
            }
            this.updateValue(this.value);
        },
    },
};
