/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-new */
/* tslint:disable:object-literal-shorthand */

export const icon = {
    template: `
    <span v-if="icon.isText">{{text}}</span>
    <i v-else :class="text"></i>
    `,
    props: ["icon", "text"],
};
