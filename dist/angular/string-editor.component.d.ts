/// <reference types="highlight.js" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
import { hljs } from "../lib";
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
    md?: any;
    hljs?: typeof hljs;
    forceHttps?: boolean;
    value?: string;
    errorMessage: string;
    buttonGroupStyle: string;
    collapsed: boolean;
    ngOnInit(): void;
    useTextArea(): boolean | undefined;
    useInput(): boolean | undefined;
    useSelect(): boolean;
    canPreviewImage(): boolean;
    canPreviewMarkdown(): boolean;
    canPreviewCode(): boolean | undefined;
    canPreview(): boolean | "" | undefined;
    getImageUrl(): string | undefined;
    getMarkdown(): any;
    getCode(): string;
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
