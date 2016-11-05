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
            @updateValue="$emit('updateValue', arguments[0])"
            @onDelete="$emit('onDelete')"
            :hasDeleteButton="hasDeleteButton">
        </object-editor>
        <array-editor v-if="schema.type === 'array'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="$emit('updateValue', arguments[0])"
            @onDelete="$emit('onDelete')"
            :hasDeleteButton="hasDeleteButton">
        </array-editor>
        <number-editor v-if="schema.type === 'number' || schema.type === 'integer'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="$emit('updateValue', arguments[0])"
            @onDelete="$emit('onDelete')"
            :hasDeleteButton="hasDeleteButton">
        </number-editor>
        <boolean-editor v-if="schema.type === 'boolean'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="$emit('updateValue', arguments[0])"
            @onDelete="$emit('onDelete')"
            :hasDeleteButton="hasDeleteButton">
        </boolean-editor>
        <null-editor v-if="schema.type === 'null'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="$emit('updateValue', arguments[0])"
            @onDelete="$emit('onDelete')"
            :hasDeleteButton="hasDeleteButton">
        </null-editor>
        <string-editor v-if="schema.type === 'string'"
            :schema="schema"
            :initialValue="initialValue"
            :title="title"
            :theme="theme"
            :locale="locale"
            :icon="icon"
            :required="required"
            @updateValue="$emit('updateValue', arguments[0])"
            @onDelete="$emit('onDelete')"
            :hasDeleteButton="hasDeleteButton">
        </string-editor>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
};
