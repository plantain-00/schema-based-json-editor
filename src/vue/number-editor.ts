import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";

@Component({
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
})
export class NumberEditor extends Vue {
    schema: common.NumberSchema;
    initialValue?: number;
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;

    value?: number = 0;
    errorMessage?: string = "";
    buttonGroupStyle = common.buttonGroupStyleString;

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number;
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    get useInput() {
        return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly);
    }
    get useSelect() {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly);
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasOptionalCheckbox() {
        return !this.required && (this.value === undefined || !this.isReadOnly);
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }

    onChange(e: { target: { value: string } }) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale);
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }
}
