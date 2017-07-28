import Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { dragula, hljs, MarkdownIt } from "../libs";
import { vueArrayEditorTemplateHtml } from "../vue-variables";

@Component({
    template: vueArrayEditorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class ArrayEditor extends Vue {
    schema: common.ArraySchema;
    initialValue?: common.ValueType[];
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;
    dragula?: typeof dragula;
    md?: MarkdownIt.MarkdownIt;
    hljs?: typeof hljs;
    forceHttps?: boolean;

    renderSwitch = 1;
    collapsed?: boolean = false;
    value?: common.ValueType[] = [];
    drak?: dragula.Drake | null = null;
    errorMessage?: string = "";
    buttonGroupStyleString = common.buttonGroupStyleString;
    invalidIndexes = [];
    filter = "";

    beforeMount() {
        this.collapsed = this.schema.collapsed;
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[];
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    get filteredValues() {
        return this.getValue.map((p, i) => ({ p, i }))
            .filter(({ p, i }) => common.filterArray(p, i, this.schema.items, this.filter));
    }
    get getValue() {
        if (this.value !== undefined && !this.collapsed) {
            return this.value;
        }
        return [];
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get hasAddButton() {
        return !this.isReadOnly && this.value !== undefined;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }
    get showFilter() {
        return this.getValue.length >= common.minItemCountIfNeedFilter;
    }

    beforeDestroy() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    mounted() {
        if (this.dragula) {
            const container = this.$el.childNodes[4] as HTMLElement;
            if (container) {
                this.drak = this.dragula([container]);
                this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
                    if (this.value) {
                        common.switchItem(this.value, el, sibling);
                        this.renderSwitch = -this.renderSwitch;
                        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
                    }
                });
            }
        }
    }

    collapseOrExpand() {
        this.collapsed = !this.collapsed;
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale);
    }
    addItem() {
        this.value!.push(common.getDefaultValue(true, this.schema.items, undefined)!);
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onDeleteFunction(i: number) {
        this.value!.splice(i, 1);
        this.renderSwitch = -this.renderSwitch;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onChange(i: number, { value, isValid }: common.ValidityValue<common.ValueType>) {
        this.value![i] = value;
        this.validate();
        common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onFilterChange(e: { target: { value: string } }) {
        this.filter = e.target.value;
    }
}
