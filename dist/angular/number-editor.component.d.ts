import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class NumberEditorComponent {
    schema: common.NumberSchema;
    initialValue: number;
    title?: string;
    updateValue: EventEmitter<{
        value: number | undefined;
        isValid: boolean;
    }>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete: EventEmitter<{}>;
    readonly?: boolean;
    required?: boolean;
    hasDeleteButton: boolean;
    value?: number;
    errorMessage: string;
    buttonGroupStyle: string;
    ngOnInit(): void;
    readonly useInput: boolean | undefined;
    readonly useSelect: boolean;
    readonly isReadOnly: boolean | undefined;
    readonly hasOptionalCheckbox: boolean;
    readonly titleToShow: string;
    onChange(e: {
        target: {
            value: string;
        };
    }): void;
    trackByFunction(index: number, value: number): number;
    validate(): void;
    toggleOptional(): void;
}
