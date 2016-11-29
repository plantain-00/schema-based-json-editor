import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "../common";
import { dragula, hljs } from "../../typings/lib";

@Component({
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <h3>
            {{titleToShow}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyleString">
                <div v-if="hasOptionalCheckbox" :class="theme.optionalCheckbox">
                    <label>
                        <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" :disabled="isReadOnly" />
                        {{locale.info.notExists}}
                    </label>
                </div>
                <button :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
                <button v-if="hasAddButton" :class="theme.button" @click="addItem()">
                    <icon :icon="icon" :text="icon.add"></icon>
                </button>
                <button v-if="hasDeleteButton && !isReadOnly" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
            </div>
        </h3>
        <p :class="theme.help">{{schema.description}}</p>
        <div :class="theme.rowContainer">
            <div v-for="(item, i) in getValue" :key="(1 + i) * renderSwitch" :data-index="i" :class="theme.rowContainer">
                <editor :schema="schema.items"
                    :title="i"
                    :initial-value="value[i]"
                    @update-value="onChange(i, arguments[0])"
                    :theme="theme"
                    :icon="icon"
                    :locale="locale"
                    :required="true"
                    :readonly="isReadOnly"
                    @delete="onDeleteFunction(i)"
                    :has-delete-button="true"
                    :dragula="dragula"
                    :md="md"
                    :hljs="hljs"
                    :forceHttps="forceHttps">
                </editor>
            </div>
        </div>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class ArrayEditor extends Vue {
    schema: common.ArraySchema;
    initialValue?: common.ValueType[];
    title: string;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    hasDeleteButton: boolean;
    dragula?: typeof dragula;
    md?: any;
    hljs?: typeof hljs;
    forceHttps?: boolean;

    renderSwitch = 1;
    collapsed = false;
    value?: common.ValueType[] = [];
    drak?: dragula.Drake | null = null;
    errorMessage?: string = "";
    buttonGroupStyleString = common.buttonGroupStyleString;
    invalidIndexes = [];

    beforeMount() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[];
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage });
    }

    get getValue() {
        if (this.value !== undefined && !this.collapsed) {
            return this.value;
        }
        return [];
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasOptionalCheckbox() {
        return !this.required && (this.value === undefined || !this.isReadOnly);
    }
    get hasAddButton() {
        return !this.isReadOnly && this.value !== undefined;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }

    beforeDestroy() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    mounted() {
        if (this.dragula) {
            const container = this.$el.childNodes[4] as HTMLElement;
            if (container) {
                this.drak = this.dragula([container]);
                this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
                    if (this.value) {
                        common.switchItem(this.value, el, sibling);
                        this.renderSwitch = -this.renderSwitch;
                        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
                    }
                });
            }
        }
    }

    collapseOrExpand() {
        this.collapsed = !this.collapsed;
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale);
    }
    addItem() {
        this.value!.push(common.getDefaultValue(true, this.schema.items, undefined) !);
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onDeleteFunction(i: number) {
        this.value!.splice(i, 1);
        this.renderSwitch = -this.renderSwitch;
        this.validate();
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onChange(i: number, {value, isValid}: common.ValidityValue<common.ValueType>) {
        this.value![i] = value;
        this.validate();
        common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
        this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }

}
