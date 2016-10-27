import { Component } from "@angular/core";
import * as common from "../common";
// import { Editor } from "./editor";

@Component({
    selector: "array-editor",
    template: "",
})
export class ArrayEditorComponent {
    renderSwitch = 1;
    collapsed = false;
    value?: common.ValueType[];
    drak: common.dragula.Drake;
}
