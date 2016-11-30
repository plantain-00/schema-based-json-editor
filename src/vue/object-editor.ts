import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { dragula, hljs, MarkdownIt } from "../../typings/lib";

@Component({
    template: `
    <div :class="theme.row">
        <h3>
            {{titleToShow}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <optional :required="required"
                    :value="value"
                    :isReadOnly="isReadOnly"
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
            <editor v-for="(propertySchema, property, i) in schema.properties"
                :key="i"
                :schema="propertySchema"
                :title="propertySchema.title || property"
                :initial-value="value[property]"
                @update-value="onChange(property, arguments[0])"
                :theme="theme"
                :icon="icon"
                :locale="locale"
                :required="isRequired(property)"
                :readonly="isReadOnly"
                :dragula="dragula"
                :md="md"
                :hljs="hljs"
                :forceHttps="forceHttps">
            </editor>
        </div>
    </div >
    `,
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
    dragula?: typeof dragula;
    md?: MarkdownIt.MarkdownIt;
    hljs?: typeof hljs;
    forceHttps?: boolean;

    collapsed = false;
    value?: { [name: string]: common.ValueType } = {};
    buttonGroupStyle = common.buttonGroupStyleString;
    invalidProperties: string[] = [];

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        if (!this.collapsed && this.value !== undefined) {
            for (const property in this.schema.properties) {
                const schema = this.schema.properties[property];
                const required = this.schema.required && this.schema.required.some((r: any) => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
            }
        }
        this.$emit("update-value", { value: this.value, isValid: true });
    }

    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get titleToShow() {
        if (this.hasDeleteButton) {
            return common.getTitle(common.findTitle(this.value), this.title, this.schema.title);
        }
        return common.getTitle(this.title, this.schema.title);
    }

    isRequired(property: string) {
        return this.schema.required && this.schema.required.some((r: any) => r === property);
    }
    collapseOrExpand() {
        this.collapsed = !this.collapsed;
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onChange(property: string, {value, isValid}: common.ValidityValue<common.ValueType>) {
        this.value![property] = value;
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.$emit("update-value", { value: this.value, isValid: this.invalidProperties.length === 0 });
    }
}
