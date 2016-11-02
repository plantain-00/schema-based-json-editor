import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class NumberEditorComponent {
    schema: common.NumberSchema;
    initialValue: number;
    title?: string;
    updateValue: EventEmitter<{}>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
    value?: number;
    errorMessage: string;
    ngOnInit(): void;
    onChange(e: {
        target: {
            value: string;
        };
    }): void;
    trackByFunction(index: number, value: number): number;
    validate(): void;
    toggleOptional(): void;
}
