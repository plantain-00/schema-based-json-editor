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
    onDelete: EventEmitter<{}>;
    readonly?: boolean;
    required?: boolean;
    hasDeleteButton: boolean;
    value?: boolean;
    ngOnInit(): void;
    onChange(e: {
        target: {
            checked: boolean;
        };
    }): void;
    toggleOptional(): void;
}
