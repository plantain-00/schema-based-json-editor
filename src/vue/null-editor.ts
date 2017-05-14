import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { srcVueNullEditorTemplateHtml } from "../vue-variables";

@Component({
    template: srcVueNullEditorTemplateHtml,
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
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }

    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined;
        this.$emit("update-value", { value: this.value, isValid: true });
    }
}
