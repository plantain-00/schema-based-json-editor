import * as Vue from "vue";
import * as common from "../common";

import { arrayEditor } from "./array-editor";
import { booleanEditor } from "./boolean-editor";
import { editor } from "./editor";
import { icon } from "./icon";
import { nullEditor } from "./null-editor";
import { numberEditor } from "./number-editor";
import { objectEditor } from "./object-editor";
import { stringEditor } from "./string-editor";
import { titleEditor } from "./title-editor";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

Vue.component("array-editor", arrayEditor);
Vue.component("boolean-editor", booleanEditor);
Vue.component("editor", editor);
Vue.component("icon", icon);
Vue.component("null-editor", nullEditor);
Vue.component("numberEditor", numberEditor);
Vue.component("objectEditor", objectEditor);
Vue.component("stringEditor", stringEditor);
Vue.component("title-editor", titleEditor);

Vue.component("json-editor", {
    template: `
    <div>
        <object-editor v-if="schema.type === 'object'"
            :schema="schema"
            :initial-value="initialValue"
            :theme="themeObject"
            :locale="localeObject"
            :icon="iconObject"
            :required="true"
            @update-value="updateValueFunction(arguments[0])">
        </object-editor>
        <array-editor v-if="schema.type === 'array'"
            :schema="schema"
            :initial-value="initialValue"
            :theme="themeObject"
            :locale="localeObject"
            :icon="iconObject"
            :required="true"
            @update-value="updateValueFunction(arguments[0])">
        </array-editor>
        <number-editor v-if="schema.type === 'number' || schema.type === 'integer'"
            :schema="schema"
            :initial-value="initialValue"
            :theme="themeObject"
            :locale="localeObject"
            :icon="iconObject"
            :required="true"
            @update-value="updateValueFunction(arguments[0])">
        </number-editor>
        <boolean-editor v-if="schema.type === 'boolean'"
            :schema="schema"
            :initial-value="initialValue"
            :theme="themeObject"
            :locale="localeObject"
            :icon="iconObject"
            :required="true"
            @update-value="updateValueFunction(arguments[0])">
        </boolean-editor>
        <null-editor v-if="schema.type === 'null'"
            :schema="schema"
            :initial-value="initialValue"
            :theme="themeObject"
            :locale="localeObject"
            :icon="iconObject"
            :required="true"
            @update-value="updateValueFunction(arguments[0])">
        </null-editor>
        <string-editor v-if="schema.type === 'string'"
            :schema="schema"
            :initial-value="initialValue"
            :theme="themeObject"
            :locale="localeObject"
            :icon="iconObject"
            :required="true"
            @update-value="updateValueFunction(arguments[0])">
        </string-editor>
    </div>
    `,
    props: ["schema", "initialValue", "theme", "icon", "locale", "readonly"],
    data: function (this: This) {
        const localeObject = common.getLocale(this.locale);
        return {
            themeObject: common.getTheme(this.theme),
            localeObject,
            iconObject: common.getIcon(this.icon, localeObject),
        };
    },
    methods: {
        updateValueFunction: common.debounce(function (this: This, value: any) {
            this.$emit("update-value", value);
        }, 100),
    },
});

export type This = {
    $emit: (event: string, ...args: any[]) => void;
    locale: common.Locale;
    theme: common.Theme;
    icon: common.Icon;
}
