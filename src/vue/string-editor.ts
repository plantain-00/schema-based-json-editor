import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { hljs } from "../../typings/lib";

@Component({
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <label :class="theme.label">
            {{titleToShow}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <optional :required="required"
                    :value="value"
                    :isReadOnly="isReadOnly"
                    :theme="theme"
                    :locale="locale"
                    @toggleOptional="toggleOptional()">
                </optional>
                <button v-if="hasDeleteButton" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
                <button v-if="canPreview" :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
                <button v-if="hasLockButton" :class="theme.button" @click="toggleLocked()">
                    <icon :icon="icon" :text="locked ? icon.unlock : icon.lock"></icon>
                </button>
            </div>
        </label>
        <textarea v-if="useTextArea"
            :class="theme.formControl"
            @change="onChange($event)"
            @keyup="onChange($event)"
            rows="5"
            :readOnly="isReadOnly">{{value}}</textarea>
        <input v-if="useInput"
            :class="theme.formControl"
            :type="schema.format"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="isReadOnly" />
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
        <p :class="theme.help">{{schema.description}}</p>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
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
    md?: any;
    hljs?: typeof hljs;
    forceHttps?: boolean;

    value?: string = "";
    errorMessage?: string = "";
    buttonGroupStyle = common.buttonGroupStyleString;
    collapsed = false;
    imagePreviewStyle = common.imagePreviewStyleString;
    locked = true;

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
        return this.value && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
    }
    get useTextArea() {
        const isUnlockedCodeOrMarkdown = (this.schema.format === "code" || this.schema.format === "markdown") && (!this.locked);
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format === "textarea" || isUnlockedCodeOrMarkdown);
    }
    get useInput() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
    }
    get useSelect() {
        return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly;
    }
    get hasLockButton() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format === "code" || this.schema.format === "markdown");
    }
    get getImageUrl() {
        return this.forceHttps ? common.replaceProtocal(this.value!) : this.value;
    }
    get getMarkdown() {
        return this.md.render(this.value);
    }
    get getCode() {
        return this.hljs!.highlightAuto(this.value!).value;
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
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

    onChange(e: { target: { value: string } }) {
        this.value = e.target.value;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
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
