import { Component, ChangeDetectionStrategy } from "@angular/core";

import { ValidityValue, ValueType } from "../dist/";
import { schema, schemaSchema } from "schema-based-json-editor/demo/";

import * as dragula from "dragula";
import * as MarkdownIt from "markdown-it";
import * as hljs from "highlight.js";

@Component({
    selector: "app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
        <a href="https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/angular/demo" target="_blank">the source code of the demo</a>
        <br/>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
            <json-editor [schema]="schemaSchema"
                [initialValue]="formattedSchema"
                (updateValue)="updateSchema($event)"
                theme="bootstrap3"
                icon="fontawesome4"
                [locale]="locale"
                [dragula]="dragula"
                [markdownit]="markdownit"
                [hljs]="hljs"
                [forceHttps]="false">
            </json-editor>
        </div>
        <div style="width: 500px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
            <json-editor [schema]="schema"
                [initialValue]="value"
                (updateValue)="updateValue($event)"
                theme="bootstrap3"
                icon="fontawesome4"
                [locale]="locale"
                [dragula]="dragula"
                [markdownit]="markdownit"
                [hljs]="hljs"
                [forceHttps]="false">
            </json-editor>
        </div>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px">
            Value:
            <pre [style.borderColor]="color"><code [innerHTML]="valueHtml"></code></pre>
        </div>
    </div>
    `,
})
export class MainComponent {
    locale = null;
    schema = schema;
    value: any = {};
    color = "black";
    dragula = dragula;
    markdownit = MarkdownIt as any;
    hljs = hljs;
    schemaSchema = schemaSchema;
    ngOnInit() {
        if (navigator.language === "zh-CN") {
            import("../../core/dist/locales/" + navigator.language + ".js").then(module => {
                this.locale = module.locale;
            });
        }
    }
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
    get valueHtml() {
        return hljs.highlight("json", JSON.stringify(this.value, null, "  ")).value;
    }
    updateValue({ value, isValid }: ValidityValue<ValueType>) {
        this.value = value;
        this.color = isValid ? "black" : "red";
    }
}
