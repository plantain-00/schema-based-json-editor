import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { JSONEditorComponent } from "../../dist/angular/index.component";

enableProdMode();

import { Component } from "@angular/core";

const schema = JSON.parse(`{
  "title": "Person",
  "type": "object",
  "required": ["name", "age", "location", "favorite_color", "pets"],
  "properties": {
    "name": {
      "type": "string",
      "description": "First and Last name",
      "minLength": 4,
      "maxLength": 20,
      "default": "Jeremy Dorn"
    },
    "age": {
      "type": "integer",
      "default": 25,
      "minimum": 18,
      "maximum": 99
    },
    "isOld": {
      "type": "boolean"
    },
    "favorite_color": {
      "type": "string",
      "format": "color",
      "title": "favorite color",
      "default": "#ffa500"
    },
    "gender": {
      "type": "string",
      "enum": [
        "male",
        "female"
      ]
    },
    "location": {
      "type": "object",
      "title": "Location",
      "properties": {
        "city": {
          "type": "string",
          "default": "San Francisco"
        },
        "state": {
          "type": "string",
          "default": "CA"
        },
        "citystate": {
          "type": "string",
          "description": "This is generated automatically from the previous two fields",
          "template": "{{city}}, {{state}}",
          "watch": {
            "city": "location.city",
            "state": "location.state"
          }
        }
      },
      "required": ["state"]
    },
    "pets": {
      "type": "array",
      "format": "table",
      "title": "Pets",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "title": "Pet",
        "required": ["type", "name"],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "cat",
              "dog",
              "bird",
              "reptile",
              "other"
            ],
            "default": "dog"
          },
          "name": {
            "type": "string",
            "default": "test"
          }
        }
      },
      "default": [
        {
          "type": "dog",
          "name": "A"
        },
        {
          "type": "dog",
          "name": "B"
        }
      ]
    },
    "numbers": {
      "type": "array",
      "format": "table",
      "title": "Numbers",
      "uniqueItems": true,
      "items": {
        "type": "number",
        "title": "Number"
      }
    }
  }
}`);

@Component({
    selector: "app",
    template: `
    <div>
        <button (click)="showData()">show data in console</button>
        <button (click)="showSchema()">show schema in console</button>
        <json-editor schema="{{schema}}"
            initialValue="{{initialValue}}"
            (updateValue)="updateValue($event)"
            theme="bootstrap3"
            icon="fontawesome4"
            locale="zh-cn">
        </json-editor>
    </div>
    `,
})
export class MainComponent {
    schema = schema;
    initialValue = {};
    value: any;
    updateValue(value: any) {
        this.value = value;
    }
    showData() {
        console.log(this.value);
    }
    showSchema() {
        console.log(schema);
    }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, JSONEditorComponent],
    bootstrap: [MainComponent],
})
class MainModule { }


platformBrowserDynamic().bootstrapModule(MainModule);
