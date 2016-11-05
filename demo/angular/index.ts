import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component } from "@angular/core";

import { schema } from "../schema";

@Component({
    selector: "app",
    template: `
    <div>
        <div style="width: 500px; margin: 10px; float: left" class="bootstrap3-row-container">
          <json-editor [schema]="schema"
              [initialValue]="value"
              (updateValue)="updateValue($event)"
              theme="bootstrap3"
              icon="fontawesome4"
              locale="zh-cn">
          </json-editor>
        </div>
        <pre style="width: 400px; margin: 10px; float: left">{{schemaString}}</pre>
        <pre style="width: 400px; margin: 10px; float: left">{{getValueString()}}</pre>
    </div>
    `,
})
export class MainComponent {
    schema = schema;
    schemaString = JSON.stringify(schema, null, "  ");
    value: any = {};
    getValueString() {
        return JSON.stringify(this.value, null, "  ");
    }
    updateValue(value: any) {
        this.value = value;
    }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, TitleEditorComponent, IconComponent } from "../../dist/angular/index";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, TitleEditorComponent, IconComponent],
    bootstrap: [MainComponent],
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule);
