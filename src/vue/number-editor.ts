import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const numberEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
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
        <input v-if="useInput()"
            :class="theme.formControl"
            type="number"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="readonly || schema.readonly" />
        <select v-if="useSelect()"
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
        this.$emit("update-value", value);
        return {
            value,
            errorMessage: undefined,
        };
    },
    methods: {
        useInput(this: This) {
            return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly);
        },
        useSelect(this: This) {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
        },
        onChange(this: This, e: { target: { value: string } }) {
            this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
            this.validate();
            this.$emit("update-value", this.value);
        },
        validate(this: This) {
            if (this.value !== undefined) {
                if (this.schema.minimum !== undefined) {
                    if (this.schema.exclusiveMinimum) {
                        if (this.value <= this.schema.minimum) {
                            this.errorMessage = this.locale.error.largerThan.replace("{0}", String(this.schema.minimum));
                            return;
                        }
                    } else {
                        if (this.value < this.schema.minimum) {
                            this.errorMessage = this.locale.error.minimum.replace("{0}", String(this.schema.minimum));
                            return;
                        }
                    }
                }
                if (this.schema.maximum !== undefined) {
                    if (this.schema.exclusiveMaximum) {
                        if (this.value >= this.schema.maximum) {
                            this.errorMessage = this.locale.error.smallerThan.replace("{0}", String(this.schema.maximum));
                            return;
                        }
                    } else {
                        if (this.value > this.schema.maximum) {
                            this.errorMessage = this.locale.error.maximum.replace("{0}", String(this.schema.maximum));
                            return;
                        }
                    }
                }
            }

            this.errorMessage = "";
        },
        toggleOptional(this: This) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as number;
            } else {
                this.value = undefined;
            }
            this.$emit("update-value", this.value);
        },
    },
};

export type This = {
    $emit: (event: string, ...args: any[]) => void;
    value?: number;
    errorMessage?: string;
    schema: any;
    initialValue: number;
    locale: common.Locale;
    validate: () => void;
    readonly: boolean;
    required: boolean;
}
