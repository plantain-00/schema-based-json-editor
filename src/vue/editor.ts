/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const editor = {
    template: `
    <div>
        <object-editor v-if="schema.type === 'object'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="updateValue($event)"
            @onDelete="onDelete()">
        </object-editor>
        <array-editor v-if="schema.type === 'array'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="updateValue($event)"
            @onDelete="onDelete()">
        </array-editor>
        <number-editor v-if="schema.type === 'number' || schema.type === 'integer'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="updateValue($event)"
            @onDelete="onDelete()">
        </number-editor>
        <boolean-editor v-if="schema.type === 'boolean'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="updateValue($event)"
            @onDelete="onDelete()">
        </boolean-editor>
        <null-editor v-if="schema.type === 'null'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="updateValue($event)"
            @onDelete="onDelete()">
        </null-editor>
        <string-editor v-if="schema.type === 'string'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="updateValue($event)"
            @onDelete="onDelete()">
        </string-editor>
    </div>
    `,
    props: ["schema", "initialValue", "title", "updateValue", "theme", "icon", "locale", "onDelete", "readonly", "required"],
};
