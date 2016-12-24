import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";

import { Cancelable } from "lodash";
export type Cancelable = Cancelable;

@Component({
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <label :class="theme.label">
            {{titleToShow}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <icon v-if="!isReadOnly"
                    @click="toggleLocked()"
                    :text="locked ? icon.unlock : icon.lock"
                    :theme="theme"
                    :icon="icon">
                </icon>
                <optional :required="required"
                    :value="value"
                    :isReadOnly="isReadOnly || isLocked"
                    :theme="theme"
                    :locale="locale"
                    @toggleOptional="toggleOptional()">
                </optional>
                <icon v-if="hasDeleteButtonFunction"
                    @click="$emit('delete')"
                    :text="icon.delete"
                    :theme="theme"
                    :icon="icon">
                </icon>
            </div>
        </label>
        <input v-if="useInput"
            :class="theme.formControl"
            type="number"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="isReadOnly || isLocked"
            :disabled="isReadOnly || isLocked" />
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
        <description :theme="theme" :message="schema.description"></description>
        <description :theme="theme" :message="errorMessage"></description>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "parentIsLocked"],
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
    parentIsLocked?: boolean;

    value?: number = 0;
    errorMessage?: string = "";
    buttonGroupStyle = common.buttonGroupStyleString;
    locked = true;

    onChange(e: { target: { value: string } }) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    get useInput() {
        return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly || this.isLocked);
    }
    get useSelect() {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly && !this.isLocked);
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get isLocked() {
        return this.parentIsLocked !== false && this.locked;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly && !this.isLocked;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }

    validate() {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale);
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }
    toggleLocked() {
        this.locked = !this.locked;
    }
}
