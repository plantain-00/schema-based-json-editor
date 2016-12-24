import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { dragula, hljs, MarkdownIt } from "../../typings/lib";

@Component({
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <h3>
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
                <icon v-if="true"
                    @click="collapseOrExpand()"
                    :text="collapsed ? icon.expand : icon.collapse"
                    :theme="theme"
                    :icon="icon">
                </icon>
                <icon v-if="hasDeleteButtonFunction"
                    @click="$emit('delete')"
                    :text="icon.delete"
                    :theme="theme"
                    :icon="icon">
                </icon>
            </div>
        </h3>
        <description :theme="theme" :message="schema.description"></description>
        <div v-if="!collapsed && value !== undefined" :class="theme.rowContainer">
            <div v-if="showFilter" :class="theme.row">
                <input :class="theme.formControl"
                    @change="onFilterChange($event)"
                    @keyup="onFilterChange($event)"
                    :value="filter" />
            </div>
            <editor v-for="(p, i) in filteredProperties"
                :key="p.property"
                :schema="p.schema"
                :title="p.schema.title || p.property"
                :initial-value="value[p.property]"
                @update-value="onChange(p.property, arguments[0])"
                :theme="theme"
                :icon="icon"
                :locale="locale"
                :required="isRequired(p.property)"
                :readonly="isReadOnly"
                :dragula="dragula"
                :md="md"
                :hljs="hljs"
                :force-https="forceHttps"
                :parent-is-locked="isLocked">
            </editor>
        </div>
        <description :theme="theme" :message="errorMessage"></description>
    </div >
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps", "parentIsLocked"],
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
    dragula?: typeof dragula;
    md?: MarkdownIt.MarkdownIt;
    hljs?: typeof hljs;
    forceHttps?: boolean;
    parentIsLocked?: boolean;

    collapsed?: boolean = false;
    value?: { [name: string]: common.ValueType } = {};
    buttonGroupStyle = common.buttonGroupStyleString;
    invalidProperties: string[] = [];
    errorMessage?: string = "";
    properties: { property: string; schema: common.Schema }[] = [];
    filter = "";
    locked = true;

    beforeMount() {
        this.collapsed = this.schema.collapsed;
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        this.validate();
        if (this.value !== undefined) {
            for (const property in this.schema.properties) {
                const schema = this.schema.properties[property];
                const required = this.schema.required && this.schema.required.some((r: any) => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
                this.properties.push({
                    property,
                    schema,
                });
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
    get isLocked() {
        return this.parentIsLocked !== false && this.locked;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly && !this.isLocked;
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
        return this.schema.required && this.schema.required.some((r: any) => r === property);
    }
    collapseOrExpand() {
        this.collapsed = !this.collapsed;
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    toggleLocked() {
        this.locked = !this.locked;
    }
    onChange(property: string, {value, isValid}: common.ValidityValue<common.ValueType>) {
        this.value![property] = value;
        this.validate();
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onFilterChange(e: { target: { value: string } }) {
        this.filter = e.target.value;
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale);
    }
}
