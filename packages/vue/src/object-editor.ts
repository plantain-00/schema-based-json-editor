import Vue from "vue";
import Component from "vue-class-component";
import * as common from "schema-based-json-editor";
import { Dragula, MarkdownIt, HLJS } from "schema-based-json-editor/dist/libs";
import { objectEditorTemplateHtml } from "./object-variables";

@Component({
    render: objectEditorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class ObjectEditor extends Vue {
    schema: common.ObjectSchema;
    initialValue?: { [name: string]: common.ValueType };
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;
    dragula?: Dragula;
    md?: MarkdownIt;
    hljs?: HLJS;
    forceHttps?: boolean;

    collapsed?: boolean = false;
    value?: { [name: string]: common.ValueType } = {};
    buttonGroupStyle = common.buttonGroupStyleString;
    errorMessage?: string = "";
    filter = "";
    private invalidProperties: string[] = [];
    private properties: { property: string; schema: common.Schema }[] = [];

    beforeMount() {
        this.collapsed = this.schema.collapsed;
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        this.validate();
        if (this.value !== undefined) {
            for (const property in this.schema.properties) {
                if (this.schema.properties.hasOwnProperty(property)) {
                    const schema = this.schema.properties[property];
                    const required = this.schema.required && this.schema.required.some(r => r === property);
                    this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
                    this.properties.push({
                        property,
                        schema,
                    });
                }
            }
            this.properties = this.properties.sort(common.compare);
        }
        this.$emit("update-value", { value: this.value, isValid: true });
    }

    get filteredProperties() {
        return this.properties.filter(p => common.filterObject(p, this.filter));
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get titleToShow() {
        if (this.hasDeleteButton) {
            return common.getTitle(common.findTitle(this.value, this.properties), this.title, this.schema.title);
        }
        return common.getTitle(this.title, this.schema.title);
    }
    get showFilter() {
        return this.properties.length >= common.minItemCountIfNeedFilter;
    }

    isRequired(property: string) {
        return this.schema.required && this.schema.required.some(r => r === property);
    }
    collapseOrExpand() {
        this.collapsed = !this.collapsed;
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onChange(property: string, { value, isValid }: common.ValidityValue<common.ValueType>) {
        this.value![property] = value;
        this.validate();
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onFilterChange(e: { target: { value: string } }) {
        this.filter = e.target.value;
    }
    private validate() {
        this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale);
    }
}
