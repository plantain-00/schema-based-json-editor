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
                <button v-if="hasDeleteButton && !readonly && !schema.readonly" :class="theme.button" @click="$emit('onDelete')">
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
                    @updateValue="onChange(i, arguments[0])"
                    :theme="theme"
                    :icon="icon"
                    :locale="locale"
                    :required="true"
                    :readonly="readonly || schema.readonly"
                    @onDelete="onDeleteFunction(i)"
                    :has-delete-button="true">
                </editor>
            </div>
        </div>
        <p v-if="errorMessage" :class="theme.help">{{errorMessage}}</p>
    </div>
    `,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton"],
    data: function(this: any) {
        const value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[];
        // this.$emit("updateValue", value);
        // const container = this.getDragulaContainer();
        // this.drak = common.dragula([container]);
        // this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
        //     if (this.value) {
        //         const fromIndex = +el.dataset["index"];
        //         if (sibling) {
        //             const toIndex = +sibling.dataset["index"];
        //             this.value.splice(toIndex, 0, this.value[fromIndex]);
        //             if (fromIndex > toIndex) {
        //                 this.value.splice(fromIndex + 1, 1);
        //             } else {
        //                 this.value.splice(fromIndex, 1);
        //             }
        //         } else {
        //             this.value.push(this.value[fromIndex]);
        //             this.value.splice(fromIndex, 1);
        //         }
        //         this.renderSwitch = -this.renderSwitch;
        //         this.$emit("updateValue", this.value);
        //     }
        // });
        return {
            renderSwitch: 1,
            collapsed: false,
            value,
            drak: undefined,
            errorMessage: undefined,
            buttonGroupStyleString: common.buttonGroupStyleString,
        };
    },
    methods: {
        getDragulaContainer(this: any) {
            return this.drakContainer.nativeElement;
        },
        ngOnDestroy(this: any) {
            if (this.drak) {
                this.drak.destroy();
            }
        },
        collapseOrExpand(this: any) {
            this.collapsed = !this.collapsed;
            // const container = this.getDragulaContainer();
            // this.drak.containers = [container];
        },
        toggleOptional(this: any) {
            if (this.value === undefined) {
                this.value = common.getDefaultValue(true, this.schema, this.initialValue) as common.ValueType[];
            } else {
                this.value = undefined;
            }
            const container = this.getDragulaContainer();
            this.drak.containers = [container];
            this.$emit("updateValue", this.value);
        },
        validate(this: any) {
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
        addItem(this: any) {
            this.value!.push(common.getDefaultValue(true, this.schema.items, undefined) !);
            this.$emit("updateValue", this.value);
        },
        onDeleteFunction(this: any, i: number) {
            this.value!.splice(i, 1);
            this.renderSwitch = -this.renderSwitch;
            this.$emit("updateValue", this.value);
            this.validate();
        },
        onChange(this: any, i: number, value: common.ValueType) {
            this.value![i] = value;
            this.$emit("updateValue", this.value);
            this.validate();
        },
    },
};
