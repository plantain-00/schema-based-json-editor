import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";

@Component({
    template: `
    <div v-if="hasOptionalCheckbox" :class="theme.optionalCheckbox">
        <label>
            <input type="checkbox" @change="$emit('toggleOptional')" :checked="value === undefined" :disabled="isReadOnly" />
            {{locale.info.notExists}}
        </label>
    </div>
    `,
    props: ["required", "value", "isReadOnly", "theme", "locale"],
})
export class Optional extends Vue {
    required: boolean | undefined;
    value: common.ValueType | undefined;
    isReadOnly: boolean | undefined;
    theme: common.Theme;
    locale: common.Locale;

    get hasOptionalCheckbox() {
        return !this.required && (this.value === undefined || !this.isReadOnly);
    }
}
