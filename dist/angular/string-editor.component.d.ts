import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class StringEditorComponent {
    schema: common.StringSchema;
    initialValue: string;
    title?: string;
    updateValue: EventEmitter<{
        value: string | undefined;
        isValid: boolean;
    }>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete: EventEmitter<{}>;
    readonly?: boolean;
    required?: boolean;
    hasDeleteButton: boolean;
    value?: string;
    errorMessage: string;
    isImageUrl: boolean;
    buttonGroupStyle: {
        marginLeft: string;
    };
    collapsed: boolean;
    ngOnInit(): void;
    useTextArea(): boolean | undefined;
    useInput(): boolean | undefined;
    useSelect(): boolean;
    onChange(e: {
        target: {
            value: string;
        };
    }): void;
    validate(): void;
    toggleOptional: () => void;
    trackByFunction(index: number, value: {
        [name: string]: common.ValueType;
    }): number;
    collapseOrExpand: () => void;
}
