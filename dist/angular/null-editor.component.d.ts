import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class NullEditorComponent {
    schema: common.NullSchema;
    initialValue: null;
    title?: string;
    updateValue: EventEmitter<{}>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
    value?: null;
    constructor();
    toggleOptional(): void;
}
