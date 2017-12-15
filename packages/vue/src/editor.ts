import Vue from "vue";
import Component from "vue-class-component";
import { editorTemplateHtml } from "./editor-variables";

@Component({
    render: editorTemplateHtml,
    props: ["schema", "initialValue", "title", "theme", "icon", "locale", "readonly", "required", "hasDeleteButton", "dragula", "md", "hljs", "forceHttps"],
})
export class Editor extends Vue {

}
