import * as Vue from "vue";
import Component from "vue-class-component";
import { srcVueEditorTemplateHtml } from "../vue-variables";

@Component({
    template: srcVueEditorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class Editor extends Vue {

}
