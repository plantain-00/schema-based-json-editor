import Vue from "vue";
import Component from "vue-class-component";
import { iconTemplateHtml } from "./variables";

@Component({
    template: iconTemplateHtml,
    props: ["icon", "text", "theme"],
})
export class Icon extends Vue {

}
