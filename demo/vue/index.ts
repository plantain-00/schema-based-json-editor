import Vue from "vue";
import Component from "vue-class-component";
import { schema, schemaSchema } from "../schema";

import "../../dist/vue";
import { ValidityValue, ValueType, Locale } from "../../dist/vue";

import * as dragula from "dragula";
import * as MarkdownIt from "markdown-it";
import * as hljs from "highlight.js";

let locale: Locale | null = null;

@Component({
    template: `
    <div>
        <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/demo/vue/index.ts" target="_blank">the source code of the demo</a>
        <br/>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
            <json-editor :schema="schemaSchema"
			    :initial-value="formattedSchema"
				@update-value="updateSchema($event)"
				theme="bootstrap3"
				icon="fontawesome4"
				:locale="locale"
				:dragula="dragula"
				:markdownit="markdownit"
				:hljs="hljs"
				:force-https="false">
			</json-editor>
		</div>
		<div style="width: 500px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
			<json-editor :schema="schema"
			    :initial-value="value"
				@update-value="updateValue($event)"
				theme="bootstrap3"
				icon="fontawesome4"
				:locale="locale"
				:dragula="dragula"
				:markdownit="markdownit"
				:hljs="hljs"
				:force-https="false">
			</json-editor>
		</div>
		<div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px">
            Value:
			<pre :style="{borderColor: color}"><code v-html="valueHtml"></code></pre>
		</div>
    </div>
    `,
})
class App extends Vue {
    locale = locale;
    schema = schema;
    value = {};
    color = "black";
    dragula = dragula;
    markdownit = MarkdownIt;
    hljs = hljs;
    valueHtml = "";
    schemaSchema = schemaSchema;
    get formattedSchema() {
        return JSON.stringify(this.schema, null, "  ");
    }
    updateSchema({ value }: ValidityValue<ValueType>) {
        try {
            this.schema = JSON.parse(value as string);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }
    updateValue({ value, isValid }: ValidityValue<ValueType>) {
        this.valueHtml = hljs.highlight("json", JSON.stringify(value, null, "  ")).value;
        this.color = isValid ? "black" : "red";
    }
}

function start() {
    // tslint:disable-next-line:no-unused-expression
    new App({ el: "#container" });
}

if (navigator.language === "zh-CN") {
    import ("../../dist/locales/" + navigator.language + ".js").then(module => {
        locale = module.locale;
        start();
    }, error => {
        start();
    });
} else {
    start();
}
