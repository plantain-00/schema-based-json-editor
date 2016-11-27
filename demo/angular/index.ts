import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component, ChangeDetectionStrategy } from "@angular/core";

import { schema } from "../schema";

import * as common from "../../dist/common";

declare const require: any;
import * as dragula from "dragula";
const markdownit = require("markdown-it");
import * as hljs from "highlight.js";

@Component({
    selector: "app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px">
            Schema:
            <pre><code [innerHTML]="schemaHtml"></code></pre>
        </div>
        <div style="width: 500px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
            GUI:
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
    schema = schema;
    schemaHtml = hljs.highlight("json", JSON.stringify(schema, null, "  ")).value;
    value: any = {};
    color = "black";
    locale = navigator.language;
    dragula = dragula;
    markdownit = markdownit;
    hljs = hljs;
    get valueHtml() {
        return hljs.highlight("json", JSON.stringify(this.value, null, "  ")).value;
    }
    updateValue({value, isValid}: common.ValidityValue<common.ValueType>) {
        this.value = value;
        this.color = isValid ? "black" : "red";
    }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, IconComponent } from "../../dist/angular";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, IconComponent],
    bootstrap: [MainComponent],
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule);
