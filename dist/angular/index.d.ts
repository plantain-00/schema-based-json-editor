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
    themeObject: {
        rowContainer: string;
        row: string;
        formControl: string;
        button: string;
        help: string;
        errorRow: string;
        label: string;
        optionalCheckbox: string;
        buttonGroup: string;
    };
    localeObject: {
        button: {
            collapse: string;
            expand: string;
            add: string;
            delete: string;
        };
        error: {
            minLength: string;
            maxLength: string;
            pattern: string;
            minimum: string;
            maximum: string;
            largerThan: string;
            smallerThan: string;
            minItems: string;
            uniqueItems: string;
        };
    };
    constructor();
}
import { BooleanEditorComponent } from "./boolean-editor.component";
export { BooleanEditorComponent };
import { ArrayEditorComponent } from "./array-editor.component";
export { ArrayEditorComponent };
import { EditorComponent } from "./editor.component";
export { EditorComponent };
import { NullEditorComponent } from "./null-editor.component";
export { NullEditorComponent };
import { NumberEditorComponent } from "./number-editor.component";
export { NumberEditorComponent };
import { ObjectEditorComponent } from "./object-editor.component";
export { ObjectEditorComponent };
import { StringEditorComponent } from "./string-editor.component";
export { StringEditorComponent };
import { TitleEditorComponent } from "./title-editor.component";
export { TitleEditorComponent };
