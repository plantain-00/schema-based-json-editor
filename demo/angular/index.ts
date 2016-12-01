import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component, ChangeDetectionStrategy } from "@angular/core";

import { schema, schemaSchema } from "../schema";

import * as common from "../../dist/common";

import * as dragula from "dragula";
import * as MarkdownIt from "markdown-it";
import * as hljs from "highlight.js";

@Component({
    selector: "app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
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
    schema = schema;
    value: any = {};
    color = "black";
    locale = navigator.language;
    dragula = dragula;
    markdownit = MarkdownIt;
    hljs = hljs;
    schemaSchema = schemaSchema;
    get formattedSchema() {
        return JSON.stringify(this.schema, null, "  ");
    }
    updateSchema({value}: common.ValidityValue<common.ValueType>) {
        try {
            this.schema = JSON.parse(value as string);
        } catch (error) {
            console.log(error);
        }
    }
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
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, IconComponent, OptionalComponent, DescriptionComponent } from "../../dist/angular";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, IconComponent, OptionalComponent, DescriptionComponent],
    bootstrap: [MainComponent],
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule);
