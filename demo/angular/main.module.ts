import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { JSONEditorModule } from "../../dist/angular";
import { MainComponent } from "./main";

@NgModule({
    imports: [BrowserModule, FormsModule, JSONEditorModule],
    declarations: [MainComponent],
    bootstrap: [MainComponent],
})
export class MainModule { }
