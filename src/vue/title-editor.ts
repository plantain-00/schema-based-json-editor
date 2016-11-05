import * as common from "../common";

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const titleEditor = {
    template: `
    <label v-if="title !== undefined && title !== null && title !== ''" :class="theme.label">
        {{title}}
        <div :class="theme.buttonGroup" :style="buttonGroupStyle">
            <button v-if="onDelete" :class="theme.button" @click="onDelete()">
                <icon :icon="icon" :text="icon.delete"></icon>
            </button>
        </div>
    </label>
    `,
    props: ["title", "onDelete", "theme", "icon", "locale"],
    data: function () {
        return {
            buttonGroupStyle: common.buttonGroupStyle,
        };
    },
};
