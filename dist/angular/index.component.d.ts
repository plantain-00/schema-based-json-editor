import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class JSONEditorComponent {
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: EventEmitter<{}>;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
    themeObject: common.Theme;
    localeObject: common.Locale;
    constructor();
}
import { BooleanEditorComponent } from "./boolean-editor.component";
export { BooleanEditorComponent };
import { ArrayEditorComponent } from "./array-editor.component";
export { ArrayEditorComponent };
