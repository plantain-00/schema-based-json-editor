import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "tslib";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { JSONEditorComponent } from "../../dist/angular/index.component";
import { JSONEditorModule } from "../../dist/angular/index.module";

enableProdMode();

import { Component } from "@angular/core";

@Component({
    selector: "app",
    template: `<json-editor [lalala]="value"></json-editor>`,
})
export class MainComponent {
    value = "abc";
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [BrowserModule, FormsModule, JSONEditorModule],
    declarations: [MainComponent, JSONEditorComponent],
    bootstrap: [MainComponent],
})
class MainModule { }


platformBrowserDynamic().bootstrapModule(MainModule);
