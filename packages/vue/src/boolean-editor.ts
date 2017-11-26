import Vue from "vue";
import Component from "vue-class-component";
import * as common from "schema-based-json-editor";
import { booleanEditorTemplateHtml } from "./variables";

@Component({
    template: booleanEditorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
})
export class BooleanEditor extends Vue {
    schema: common.ArraySchema;
    initialValue?: boolean;
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;

    value?: boolean = false;
    buttonGroupStyle = common.buttonGroupStyleString;

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean;
        this.$emit("update-value", { value: this.value, isValid: true });
    }

    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }

    onChange(e: { target: { checked: boolean } }) {
        this.value = !this.value;
        this.$emit("update-value", { value: this.value, isValid: true });
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined;
        this.$emit("update-value", { value: this.value, isValid: true });
    }
}
