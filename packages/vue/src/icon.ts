import Vue from "vue";
import Component from "vue-class-component";
import { iconTemplateHtml } from "./icon-variables";

@Component({
    render: iconTemplateHtml,
    props: ["icon", "text", "theme"],
})
export class Icon extends Vue {

}
