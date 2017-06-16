import Vue from "vue";
import Component from "vue-class-component";
import { srcVueIconTemplateHtml } from "../vue-variables";

@Component({
    template: srcVueIconTemplateHtml,
    props: ["icon", "text", "theme"],
})
export class Icon extends Vue {

}
