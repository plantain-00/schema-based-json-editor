import Vue from "vue";
import Component from "vue-class-component";
import { editorTemplateHtml } from "./variables";

@Component({
    template: editorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class Editor extends Vue {

}
