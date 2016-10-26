import "core-js/es6";
import "core-js/es7/reflect";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { JSONEditorModule } from "../../dist/angular/index.module";

enableProdMode();

import { Component } from "@angular/core";

@Component({
    selector: "index",
    template: `<json-editor lalala="currentHero"></json-editor>`,
})
export class MainComponent {
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [BrowserModule, FormsModule, JSONEditorModule],
    declarations: [MainComponent],
    bootstrap: [MainComponent],
})
class MainModule { }


platformBrowserDynamic().bootstrapModule(MainModule);
