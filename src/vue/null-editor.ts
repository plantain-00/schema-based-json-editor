import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";

@Component({
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
        <p :class="theme.help">{{schema.description}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
})
export class NullEditor extends Vue {
    schema: common.ArraySchema;
    initialValue?: null;
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;

    value?: null = null;
    buttonGroupStyle = common.buttonGroupStyleString;

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null;
        this.$emit("update-value", { value: this.value, isValid: true });
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

    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined;
        this.$emit("update-value", { value: this.value, isValid: true });
    }
}
