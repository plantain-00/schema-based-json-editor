import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { JSONEditorComponent } from "./index.component";

import * as common from "../common";
export { common };

@NgModule({
    imports: [BrowserModule, FormsModule],
    bootstrap: [JSONEditorComponent],
})
export class JSONEditorModule { }
