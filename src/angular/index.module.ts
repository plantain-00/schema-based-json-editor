import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { JSONEditorComponent } from "./index.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [JSONEditorComponent],
    bootstrap: [JSONEditorComponent],
})
export class JSONEditorModule { }
