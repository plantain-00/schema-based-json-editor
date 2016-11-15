/// <reference types="lodash" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
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
import { IconComponent } from "./icon.component";
export { IconComponent };
