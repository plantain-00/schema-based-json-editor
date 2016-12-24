import * as Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: `
    <object-editor v-if="schema.type === 'object'"
        :schema="schema"
        :initial-value="initialValue"
        :title="title"
        :theme="theme"
        :locale="locale"
        :icon="icon"
        :readonly="readonly"
        :required="required"
        @update-value="$emit('update-value', arguments[0])"
        @delete="$emit('delete')"
        :has-delete-button="hasDeleteButton"
        :dragula="dragula"
        :md="md"
        :hljs="hljs"
        :forceHttps="forceHttps"
        :parent-is-locked="parentIsLocked">
    </object-editor>
    <array-editor v-else-if="schema.type === 'array'"
        :schema="schema"
        :initial-value="initialValue"
        :title="title"
        :theme="theme"
        :locale="locale"
        :icon="icon"
        :readonly="readonly"
        :required="required"
        @update-value="$emit('update-value', arguments[0])"
        @delete="$emit('delete')"
        :has-delete-button="hasDeleteButton"
        :dragula="dragula"
        :md="md"
        :hljs="hljs"
        :forceHttps="forceHttps"
        :parent-is-locked="parentIsLocked">
    </array-editor>
    <number-editor v-else-if="schema.type === 'number' || schema.type === 'integer'"
        :schema="schema"
        :initial-value="initialValue"
        :title="title"
        :theme="theme"
        :locale="locale"
        :icon="icon"
        :readonly="readonly"
        :required="required"
        @update-value="$emit('update-value', arguments[0])"
        @delete="$emit('delete')"
        :has-delete-button="hasDeleteButton"
        :parent-is-locked="parentIsLocked">
    </number-editor>
    <boolean-editor v-else-if="schema.type === 'boolean'"
        :schema="schema"
        :initial-value="initialValue"
        :title="title"
        :theme="theme"
        :locale="locale"
        :icon="icon"
        :readonly="readonly"
        :required="required"
        @update-value="$emit('update-value', arguments[0])"
        @delete="$emit('delete')"
        :has-delete-button="hasDeleteButton"
        :parent-is-locked="parentIsLocked">
    </boolean-editor>
    <null-editor v-else-if="schema.type === 'null'"
        :schema="schema"
        :initial-value="initialValue"
        :title="title"
        :theme="theme"
        :locale="locale"
        :icon="icon"
        :readonly="readonly"
        :required="required"
        @update-value="$emit('update-value', arguments[0])"
        @delete="$emit('delete')"
        :has-delete-button="hasDeleteButton">
    </null-editor>
    <string-editor v-else-if="schema.type === 'string'"
        :schema="schema"
        :initial-value="initialValue"
        :title="title"
        :theme="theme"
        :locale="locale"
        :icon="icon"
        :readonly="readonly"
        :required="required"
        @update-value="$emit('update-value', arguments[0])"
        @delete="$emit('delete')"
        :has-delete-button="hasDeleteButton"
        :dragula="dragula"
        :md="md"
        :hljs="hljs"
        :forceHttps="forceHttps"
        :parent-is-locked="parentIsLocked">
    </string-editor>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps", "parentIsLocked"],
})
export class Editor extends Vue {

}
