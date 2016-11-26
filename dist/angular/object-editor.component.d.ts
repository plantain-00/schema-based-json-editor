/// <reference types="dragula" />
/// <reference types="highlight.js" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
import { hljs, dragula } from "../lib";
export declare class ObjectEditorComponent {
    schema: common.ObjectSchema;
    initialValue: {
        [name: string]: common.ValueType;
    };
    title?: string;
    updateValue: EventEmitter<{
        value: {
            [name: string]: common.ValueType;
        } | undefined;
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
    collapsed: boolean;
    value?: {
        [name: string]: common.ValueType;
    };
    properties: {
        name: string;
        value: common.ValueType;
    }[];
    buttonGroupStyle: string;
    invalidProperties: string[];
    ngOnInit(): void;
    isRequired(property: string): boolean | undefined;
    trackByFunction(index: number, value: {
        [name: string]: common.ValueType;
    }): number;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    onChange(property: string, {value, isValid}: common.ValidityValue<{
        [name: string]: common.ValueType;
    }>): void;
    readonly hasDeleteButtonFunction: boolean;
}
