import Vue from "vue";
import Component from "vue-class-component";
import { vueEditorTemplateHtml } from "../vue-variables";

@Component({
    template: vueEditorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class Editor extends Vue {

}
