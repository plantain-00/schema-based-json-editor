import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class BooleanEditorComponent {
    schema: common.BooleanSchema;
    initialValue: boolean;
    title?: string;
    updateValue: EventEmitter<{}>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
    value?: boolean;
    constructor();
}
