import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component } from "@angular/core";

const schema: any = {
    title: "Person",
    type: "object",
    required: ["name", "age", "location", "favorite_color", "pets", "description"],
    properties: {
        name: {
            type: "string",
            description: "First and Last name",
            minLength: 4,
            maxLength: 20,
            default: "Sara",
        },
        age: {
            type: "integer",
            default: 25,
            minimum: 18,
            maximum: 99,
        },
        isOld: {
            type: "boolean",
        },
        favorite_color: {
            type: "string",
            format: "color",
            title: "favorite color",
            default: "#ffa500",
        },
        gender: {
            type: "string",
            enum: [
                "male",
                "female",
            ],
        },
        description: {
            type: "string",
            format: "textarea",
            default: "test",
        },
        location: {
            type: "object",
            title: "Location",
            properties: {
                city: {
                    type: "string",
                    default: "San Francisco",
                },
                state: {
                    type: "string",
                    default: "CA",
                },
            },
            required: ["state"],
        },
        pets: {
            type: "array",
            format: "table",
            title: "Pets",
            uniqueItems: true,
            minItems: 1,
            items: {
                type: "object",
                title: "Pet",
                required: ["type", "name"],
                properties: {
                    type: {
                        type: "string",
                        enum: [
                            "cat",
                            "dog",
                            "bird",
                            "reptile",
                            "other",
                        ],
                        default: "dog",
                    },
                    name: {
                        type: "string",
                        default: "test",
                    },
                },
            },
            default: [
                {
                    type: "dog",
                    name: "A",
                },
                {
                    type: "dog",
                    name: "B",
                },
            ],
        },
        numbers: {
            type: "array",
            format: "table",
            title: "Numbers",
            uniqueItems: true,
            items: {
                type: "number",
                title: "Number",
            },
        },
    },
};

@Component({
    selector: "app",
    template: `
    <div>
        <div style="width: 500px; margin: 10px; float: left">
          <json-editor schema="{{schema}}"
              initialValue="{{value}}"
              (updateValue)="updateValue($event)"
              theme="bootstrap3"
              icon="fontawesome4"
              locale="zh-cn">
          </json-editor>
        </div>
        <pre style="width: 400px; margin: 10px; float: left">{{schemaString}}</pre>
        <pre style="width: 400px; margin: 10px; float: left">{{value}}</pre>
    </div>
    `,
})
export class MainComponent {
    schema = schema;
    schemaString = JSON.stringify(schema, null, "  ");
    value: any = {};
    updateValue(value: any) {
        this.value = value;
    }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, TitleEditorComponent } from "../../dist/angular/index";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, TitleEditorComponent],
    bootstrap: [MainComponent],
})
class MainModule { }


platformBrowserDynamic().bootstrapModule(MainModule);
