import Vue from "vue";
import Component from "vue-class-component";
import { vueIconTemplateHtml } from "../vue-variables";

@Component({
    template: vueIconTemplateHtml,
    props: ["icon", "text", "theme"],
})
export class Icon extends Vue {

}
