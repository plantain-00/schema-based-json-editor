import * as common from "../common";
import { hljs } from "../lib";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const stringEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <label v-if="title !== undefined && title !== null && title !== ''" :class="theme.label">
            {{title}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyle">
                <div v-if="!required && (value === undefined || !schema.readonly)" :class="theme.optionalCheckbox">
                    <label>
                        <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" :disabled="readonly || schema.readonly" />
                        is undefined
                    </label>
                </div>
                <button v-if="hasDeleteButton" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
                <button v-if="canPreview" :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
            </div>
        </label>
        <textarea v-if="useTextArea"
            :class="theme.formControl"
            @change="onChange($event)"
            @keyup="onChange($event)"
            rows="5"
            :readOnly="readonly || schema.readonly">{{value}}</textarea>
        <input v-if="useInput"
            :class="theme.formControl"
            :type="schema.format"
            @change="onChange($event)"
            @keyup="onChange($event)"
            :value="value"
            :readOnly="readonly || schema.readonly" />
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
        <img v-if="value && !collapsed && canPreviewImage"
            :style="imagePreviewStyle"
            :src="getImageUrl" />
        <div v-if="value && !collapsed && canPreviewMarkdown" v-html="getMarkdown"></div>
        <pre v-if="value && !collapsed && canPreviewCode"><code v-html="getCode"></code></pre>
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
            return this.value !== undefined
                && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
                && (this.schema.format === "textarea" || this.schema.format === "code" || this.schema.format === "markdown");
        },
        useInput(this: This) {
            return this.value !== undefined
                && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
                && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
        },
        useSelect(this: This) {
            return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
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
};
