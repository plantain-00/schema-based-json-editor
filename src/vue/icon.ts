import * as Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: `
    <span v-if="icon.isText">{{text}}</span>
    <i v-else :class="text"></i>
    `,
    props: ["icon", "text"],
})
export class Icon extends Vue {

}
