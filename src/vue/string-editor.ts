import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { hljs, MarkdownIt } from "../../typings/lib";

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
                <icon v-if="canPreview"
                    @click="collapseOrExpand()"
                    :text="collapsed ? icon.expand : icon.collapse"
                    :theme="theme"
                    :icon="icon">
                </icon>
            </div>
        </label>
        <textarea v-if="useTextArea"
            :class="theme.formControl"
            @change="onChange($event)"
            @keyup="onChange($event)"
            rows="10"
            :readOnly="isReadOnly || isLocked"
            :disabled="isReadOnly || isLocked">{{value}}</textarea>
        <input v-if="useInput"
            :class="theme.formControl"
            :type="schema.format"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="isReadOnly || isLocked"
            :disabled="isReadOnly || isLocked" />
        <select v-if="useSelect"
            :class="theme.formControl"
            @change="onChange($event)">
            <option v-for="(e, i) in schema.enum"
                :key="i"
                :value="e"
                :selected="value === e">
                {{e}}
            </option>
        </select>
        <img v-if="willPreviewImage"
            :style="imagePreviewStyle"
            :src="getImageUrl" />
        <div v-if="willPreviewMarkdown" v-html="getMarkdown"></div>
        <pre v-if="willPreviewCode"><code v-html="getCode"></code></pre>
        <description :theme="theme" :message="schema.description"></description>
        <description :theme="theme" :message="errorMessage"></description>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps", "parentIsLocked"],
})
export class StringEditor extends Vue {
    schema: common.StringSchema;
    initialValue: string | undefined;
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;
    md?: MarkdownIt.MarkdownIt;
    hljs?: typeof hljs;
    forceHttps?: boolean;
    parentIsLocked?: boolean;

    value?: string = "";
    errorMessage?: string = "";
    buttonGroupStyle = common.buttonGroupStyleString;
    collapsed = false;
    imagePreviewStyle = common.imagePreviewStyleString;
    locked = true;

    onChange(e: { target: { value: string } }) {
        this.value = e.target.value;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    get canPreviewImage() {
        return common.isImageUrl(this.value);
    }
    get canPreviewMarkdown() {
        return this.md && this.schema.format === "markdown";
    }
    get canPreviewCode() {
        return this.hljs && this.schema.format === "code";
    }
    get canPreview() {
        return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
    }
    get useTextArea() {
        const isUnlockedCodeOrMarkdown = (this.schema.format === "code" || this.schema.format === "markdown") && (!this.locked);
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly || this.isLocked)
            && (this.schema.format === "textarea" || isUnlockedCodeOrMarkdown);
    }
    get useInput() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly || this.isLocked)
            && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
    }
    get useSelect() {
        return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly && !this.isLocked;
    }
    get getImageUrl() {
        return this.forceHttps ? common.replaceProtocal(this.value!) : this.value;
    }
    get getMarkdown() {
        return this.md!.render(this.value!);
    }
    get getCode() {
        return this.hljs!.highlightAuto(this.value!).value;
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
    get willPreviewImage() {
        return this.value && !this.collapsed && this.canPreviewImage;
    }
    get willPreviewMarkdown() {
        return this.value && !this.collapsed && this.canPreviewMarkdown;
    }
    get willPreviewCode() {
        return this.value && !this.collapsed && this.canPreviewCode;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }

    validate() {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }
    collapseOrExpand() {
        this.collapsed = !this.collapsed;
    }
    toggleLocked() {
        this.locked = !this.locked;
    }
}
