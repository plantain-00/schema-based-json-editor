import Vue from "vue";
import Component from "vue-class-component";
import * as common from "schema-based-json-editor";
export * from "schema-based-json-editor";

import { MarkdownItType, HLJS } from "schema-based-json-editor/dist/libs";

import { ArrayEditor } from "./array-editor";
import { BooleanEditor } from "./boolean-editor";
import { Editor } from "./editor";
import { Icon } from "./icon";
import { NullEditor } from "./null-editor";
import { NumberEditor } from "./number-editor";
import { ObjectEditor } from "./object-editor";
import { StringEditor } from "./string-editor";
import { Optional } from "./optional";
import { Description } from "./description";

Vue.component("array-editor", ArrayEditor);
Vue.component("boolean-editor", BooleanEditor);
Vue.component("editor", Editor);
Vue.component("icon", Icon);
Vue.component("null-editor", NullEditor);
Vue.component("numberEditor", NumberEditor);
Vue.component("objectEditor", ObjectEditor);
Vue.component("stringEditor", StringEditor);
Vue.component("optional", Optional);
Vue.component("description", Description);

import { indexTemplateHtml, indexTemplateHtmlStatic } from "./variables";

@Component({
    render: indexTemplateHtml,
    staticRenderFns: indexTemplateHtmlStatic,
    props: ["schema", "initialValue", "theme", "icon", "locale", "readonly", "dragula", "markdownit", "hljs", "forceHttps"],
})
export class JSONEditor extends Vue {
    theme: string;
    locale: common.Locale;
    icon: string;
    markdownit: MarkdownItType;
    hljs: HLJS;
    forceHttps: boolean;

    themeObject = common.getTheme(this.theme);
    localeObject: common.Locale;
    iconObject: common.Icon;
    md = common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps);

    constructor() {
        super();
        this.localeObject = common.getLocale(this.locale);
        this.iconObject = common.getIcon(this.icon, this.localeObject);
    }

    updateValue(value: common.ValueType) {
        this.$emit("update-value", value);
    }
}

Vue.component("json-editor", JSONEditor);
