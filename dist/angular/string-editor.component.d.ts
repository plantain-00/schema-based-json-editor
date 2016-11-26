/// <reference types="dragula" />
/// <reference types="highlight.js" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
import { hljs, dragula } from "../../typings/lib";
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
    dragula?: typeof dragula;
    md?: any;
    hljs?: typeof hljs;
    forceHttps?: boolean;
    value?: string;
    errorMessage: string;
    buttonGroupStyle: string;
    collapsed: boolean;
    ngOnInit(): void;
    readonly useTextArea: boolean | undefined;
    readonly useInput: boolean | undefined;
    readonly useSelect: boolean;
    readonly canPreviewImage: boolean;
    readonly canPreviewMarkdown: boolean;
    readonly canPreviewCode: boolean | undefined;
    readonly canPreview: boolean | "" | undefined;
    readonly getImageUrl: string | undefined;
    readonly getMarkdown: any;
    readonly getCode: string;
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
