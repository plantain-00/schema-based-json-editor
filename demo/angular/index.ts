import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component } from "@angular/core";

import { schema } from "../schema";

import * as common from "../../dist/common";

@Component({
    selector: "app",
    template: `
    <div>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px">
            Schema:
            <pre>{{schemaString}}</pre>
        </div>
        <div style="width: 500px; margin: 10px; float: left; overflow-y: scroll; height: 600px" class="bootstrap3-row-container">
            GUI:
            <json-editor [schema]="schema"
                [initialValue]="value"
                (updateValue)="updateValue($event)"
                theme="bootstrap3"
                icon="fontawesome4"
                [locale]="locale">
            </json-editor>
        </div>
        <div style="width: 400px; margin: 10px; float: left; overflow-y: scroll; height: 600px">
            Value:
            <pre [style.color]="color">{{getValueString()}}</pre>
        </div>
    </div>
    `,
})
export class MainComponent {
    schema = schema;
    schemaString = JSON.stringify(schema, null, "  ");
    value: any = {};
    color = "black";
    locale = navigator.language;
    getValueString() {
        return JSON.stringify(this.value, null, "  ");
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
