import * as common from "../common";
import { hljs } from "../../typings/lib";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const stringEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
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
    data: function(this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.$emit("update-value", { value, isValid: !this.errorMessage });
        return {
            value,
            errorMessage: undefined,
            buttonGroupStyle: common.buttonGroupStyleString,
            collapsed: false,
            imagePreviewStyle: common.imagePreviewStyleString,
            locked: true,
        };
    },
    beforeMount(this: This) {
        this.validate();
    },
    computed: {
        canPreviewImage(this: This) {
            return common.isImageUrl(this.value);
        },
        canPreviewMarkdown(this: This) {
            return this.md && this.schema.format === "markdown";
        },
        canPreviewCode(this: This) {
            return this.hljs && this.schema.format === "code";
        },
        canPreview(this: This) {
            return this.value && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
        },
        useTextArea(this: This) {
            const isUnlockedCodeOrMarkdown = (this.schema.format === "code" || this.schema.format === "markdown") && (!this.locked);
            return this.value !== undefined
                && (this.schema.enum === undefined || this.isReadOnly)
                && (this.schema.format === "textarea" || isUnlockedCodeOrMarkdown);
        },
        useInput(this: This) {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.isReadOnly)
                && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
        },
        useSelect(this: This) {
            return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly;
        },
        hasLockButton(this: This) {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.isReadOnly)
                && (this.schema.format === "code" || this.schema.format === "markdown");
        },
        getImageUrl(this: This) {
            return this.forceHttps ? common.replaceProtocal(this.value!) : this.value;
        },
        getMarkdown(this: This) {
            return this.md.render(this.value);
        },
        getCode(this: This) {
            return this.hljs!.highlightAuto(this.value!).value;
        },
        isReadOnly(this: This) {
            return this.readonly || this.schema.readonly;
        },
        hasOptionalCheckbox(this: This) {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        willPreviewImage(this: This) {
            return this.value && !this.collapsed && this.canPreviewImage;
        },
        willPreviewMarkdown(this: This) {
            return this.value && !this.collapsed && this.canPreviewMarkdown;
        },
        willPreviewCode(this: This) {
            return this.value && !this.collapsed && this.canPreviewCode;
        },
        titleToShow(this: This) {
            return common.getTitle(this.title, this.schema.title);
        },
    },
    methods: {
        onChange(this: This, e: { target: { value: string } }) {
            this.value = e.target.value;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        validate(this: This) {
            this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
        },
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
        },
        collapseOrExpand(this: This) {
            this.collapsed = !this.collapsed;
        },
        toggleLocked(this: This) {
            this.locked = !this.locked;
        },
    },
};

export type This = {
    $emit: (event: string, args: common.ValidityValue<common.ValueType | undefined>) => void;
    validate: () => void;
    value?: string;
    errorMessage?: string;
    schema: common.StringSchema;
    initialValue: string;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    collapsed: boolean;
    md: any;
    hljs: typeof hljs;
    forceHttps: boolean;
    canPreviewImage: boolean;
    canPreviewMarkdown: boolean;
    canPreviewCode: boolean;
    isReadOnly: boolean;
    locked: boolean;
    title: string;
};
