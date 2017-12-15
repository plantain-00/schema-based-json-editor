import Vue from "vue";
import Component from "vue-class-component";

import { descriptionTemplateHtml } from "./description-variables";

@Component({
    render: descriptionTemplateHtml,
    props: ["theme", "message", "notEmpty"],
})
export class Description extends Vue {

}
