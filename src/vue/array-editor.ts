import * as common from "../common";
import { dragula } from "../../typings/lib";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const arrayEditor = {
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
    data: function (this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[];
        this.$emit("update-value", { value, isValid: !this.errorMessage });
        return {
            renderSwitch: 1,
            collapsed: false,
            value,
            drak: undefined,
            errorMessage: undefined,
            buttonGroupStyleString: common.buttonGroupStyleString,
            invalidIndexes: [],
        };
    },
    beforeDestroy(this: This) {
        if (this.drak) {
            this.drak.destroy();
        }
    },
    computed: {
        getValue(this: This) {
            if (this.value !== undefined && !this.collapsed) {
                return this.value;
            }
            return [];
        },
        isReadOnly(this: This) {
            return this.readonly || this.schema.readonly;
        },
        hasOptionalCheckbox(this: This) {
            return !this.required && (this.value === undefined || !this.isReadOnly);
        },
        hasAddButton(this: This) {
            return !this.isReadOnly && this.value !== undefined;
        },
        titleToShow(this: This) {
            return common.getTitle(this.title, this.schema.title);
        },
    },
    mounted(this: This) {
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
    },
    methods: {
        collapseOrExpand(this: This) {
            this.collapsed = !this.collapsed;
        },
        toggleOptional(this: This) {
            this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
        },
        validate(this: This) {
            this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale);
        },
        addItem(this: This) {
            this.value!.push(common.getDefaultValue(true, this.schema.items, undefined) !);
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
        },
        onDeleteFunction(this: This, i: number) {
            this.value!.splice(i, 1);
            this.renderSwitch = -this.renderSwitch;
            this.validate();
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
        },
        onChange(this: This, i: number, {value, isValid}: common.ValidityValue<common.ValueType>) {
            this.value![i] = value;
            this.validate();
            common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
            this.$emit("update-value", { value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
        },
    },
};

export type This = {
    dragula?: typeof dragula;
    drak?: dragula.Drake;
    $emit: (event: string, args: common.ValidityValue<common.ValueType[] | undefined>) => void;
    required: boolean;
    schema: common.ArraySchema;
    initialValue: common.ValueType[];
    value?: common.ValueType[];
    collapsed: boolean;
    errorMessage?: string;
    locale: common.Locale;
    renderSwitch: number;
    validate: () => void;
    $el: HTMLElement;
    invalidIndexes: number[];
    readonly: boolean;
    isReadOnly: boolean;
    title: string;
};
