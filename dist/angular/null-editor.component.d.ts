/// <reference types="highlight.js" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
import { hljs } from "../lib";
export declare class NullEditorComponent {
    schema: common.NullSchema;
    initialValue: null;
    title?: string;
    updateValue: EventEmitter<{
        value: null | undefined;
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
    value?: null;
    buttonGroupStyle: string;
    ngOnInit(): void;
    toggleOptional(): void;
}
