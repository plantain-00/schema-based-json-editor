import * as Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: `
    <button :class="theme.button" @click="$emit('click')">
        <span v-if="icon.isText">{{text}}</span>
        <i v-else :class="text"></i>
    </button>
    `,
    props: ["icon", "text", "theme"],
})
export class Icon extends Vue {

}
