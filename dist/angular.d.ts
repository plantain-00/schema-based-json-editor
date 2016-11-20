/// <reference types="lodash" />
import { EventEmitter } from "@angular/core";
import * as common from "./common";
export declare class JSONEditorComponent {
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: EventEmitter<{
        value: string | number | boolean | any[] | {
            [name: string]: any;
        } | null | undefined;
        isValid: boolean;
    }>;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
    themeObject: common.Theme;
    localeObject: common.Locale;
    iconObject: common.Icon;
    updateValueFunction: ((value: {
        value: string | number | boolean | any[] | {
            [name: string]: any;
        } | null | undefined;
        isValid: boolean;
    }) => void) & Cancelable;
    ngOnInit(): void;
}
import { Cancelable } from "lodash";
export declare type Cancelable = Cancelable;
import { BooleanEditorComponent } from "./angular/boolean-editor.component";
export { BooleanEditorComponent };
import { ArrayEditorComponent } from "./angular/array-editor.component";
export { ArrayEditorComponent };
import { EditorComponent } from "./angular/editor.component";
export { EditorComponent };
import { NullEditorComponent } from "./angular/null-editor.component";
export { NullEditorComponent };
import { NumberEditorComponent } from "./angular/number-editor.component";
export { NumberEditorComponent };
import { ObjectEditorComponent } from "./angular/object-editor.component";
export { ObjectEditorComponent };
import { StringEditorComponent } from "./angular/string-editor.component";
export { StringEditorComponent };
import { TitleEditorComponent } from "./angular/title-editor.component";
export { TitleEditorComponent };
import { IconComponent } from "./angular/icon.component";
export { IconComponent };
