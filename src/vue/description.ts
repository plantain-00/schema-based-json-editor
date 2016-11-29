import * as Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: `
    <p v-if="notEmpty || message" :class="theme.help">{{message}}</p>
    `,
    props: ["theme", "message", "notEmpty"],
})
export class Description extends Vue {

}
