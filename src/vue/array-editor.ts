import * as Vue from "vue";
import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const arrayEditor = {
    template: `
    <div :class="errorMessage ? theme.errorRow : theme.row">
        <h3>
            {{title || schema.title}}
            <div :class="theme.buttonGroup" :style="buttonGroupStyleString">
                <button :class="theme.button" @click="collapseOrExpand()">
                    <icon :icon="icon" :text="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
                <button v-if="!readonly && value !== undefined" :class="theme.button" @click="addItem()">
                    <icon :icon="icon" :text="icon.add"></icon>
                </button>
                <button v-if="hasDeleteButton && !readonly && !schema.readonly" :class="theme.button" @click="$emit('delete')">
                    <icon :icon="icon" :text="icon.delete"></icon>
                </button>
            </div>
        </h3>
        <p :class="theme.help">{{schema.description}}</p>
        <div v-if="!required" :class="theme.optionalCheckbox">
            <label>
                <input type="checkbox" @change="toggleOptional()" :checked="value === undefined" />
                is undefined
            </label>
        </div>
        <div v-if="value !== undefined && !collapsed" :class="theme.rowContainer">
            <div v-for="(item, i) in value" :key="(1 + i) * renderSwitch" :data-index="i" :class="theme.rowContainer">
                <editor :schema="schema.items"
                    :title="i"
                    :initial-value="value[i]"
                    @update-value="onChange(i, arguments[0])"
                    :theme="theme"
                    :icon="icon"
                    :locale="locale"
                    :required="true"
                    :readonly="readonly || schema.readonly"
                    @delete="onDeleteFunction(i)"
                    :has-delete-button="true">
                </editor>
            </div>
        </div>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function(this: This) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[];
        this.$emit("update-value", value);
        return {
            renderSwitch: 1,
            collapsed: false,
            value,
            drak: undefined,
            errorMessage: undefined,
            buttonGroupStyleString: common.buttonGroupStyleString,
        };
    },
    beforeDestroy(this: This) {
        if (this.drak) {
            this.drak.destroy();
        }
    },
    mounted(this: This) {
        const container = this.getDragulaContainer();
        this.drak = common.dragula([container]);
        this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
            if (this.value) {
                const fromIndex = +el.dataset["index"];
                if (sibling) {
                    const toIndex = +sibling.dataset["index"];
                    this.value.splice(toIndex, 0, this.value[fromIndex]);
                    if (fromIndex > toIndex) {
                        this.value.splice(fromIndex + 1, 1);
                    } else {
                        this.value.splice(fromIndex, 1);
                    }
                } else {
                    this.value.push(this.value[fromIndex]);
                    this.value.splice(fromIndex, 1);
                }
                this.renderSwitch = -this.renderSwitch;
                this.$emit("update-value", this.value);
            }
        });
    },
    methods: {
        getDragulaContainer(this: This) {
            return this.$el.childNodes[6] as HTMLElement;
        },
        collapseOrExpand(this: This) {
            this.collapsed = !this.collapsed;
            Vue.nextTick(() => {
                const container = this.getDragulaContainer();
                if (container) {
                    this.drak.containers = [container];
                }
            });
        },
        toggleOptional(this: This) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as common.ValueType[];
            } else {
                this.value = undefined;
            }
            Vue.nextTick(() => {
                const container = this.getDragulaContainer();
                if (container) {
                    this.drak.containers = [container];
                }
            });
            this.$emit("update-value", this.value);
        },
        validate(this: This) {
            if (this.value !== undefined) {
                if (this.schema.minItems !== undefined) {
                    if (this.value.length < this.schema.minItems) {
                        this.errorMessage = this.locale.error.minItems.replace("{0}", String(this.schema.minItems));
                        return;
                    }
                }
                if (this.schema.uniqueItems) {
                    for (let i = 1; i < this.value.length; i++) {
                        for (let j = 0; j < i; j++) {
                            if (common.isSame(this.value[i], this.value[j])) {
                                this.errorMessage = this.locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                                return;
                            }
                        }
                    }
                }
            }

            this.errorMessage = "";
        },
        addItem(this: This) {
            this.value!.push(common.getDefaultValue(true, this.schema.items, undefined) !);
            this.$emit("update-value", this.value);
        },
        onDeleteFunction(this: This, i: number) {
            this.value!.splice(i, 1);
            this.renderSwitch = -this.renderSwitch;
            this.$emit("update-value", this.value);
            this.validate();
        },
        onChange(this: This, i: number, value: common.ValueType) {
            this.value![i] = value;
            this.$emit("update-value", this.value);
            this.validate();
        },
    },
};

export type This = {
    drak: common.dragula.Drake;
    $emit: (event: string, ...args: any[]) => void;
    required: boolean;
    schema: any;
    initialValue: common.ValueType[];
    value?: common.ValueType[];
    collapsed: boolean;
    errorMessage?: string;
    locale: common.Locale;
    renderSwitch: number;
    validate: () => void;
    $el: HTMLElement;
    getDragulaContainer: () => HTMLElement;
}
