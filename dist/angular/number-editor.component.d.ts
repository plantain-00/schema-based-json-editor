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
    buttonGroupStyle: {
        marginLeft: string;
    };
    ngOnInit(): void;
    useInput(): boolean | undefined;
    useSelect(): boolean;
    onChange(e: {
        target: {
            value: string;
        };
    }): void;
    trackByFunction(index: number, value: number): number;
    validate(): void;
    toggleOptional(): void;
}
