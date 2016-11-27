/// <reference types="dragula" />
/// <reference types="highlight.js" />
import { EventEmitter, ElementRef } from "@angular/core";
import * as common from "../common";
import { hljs, dragula } from "../../typings/lib";
export declare class ArrayEditorComponent {
    schema: common.ArraySchema;
    initialValue: common.ValueType[];
    title?: string;
    updateValue: EventEmitter<{
        value: common.ValueType[] | undefined;
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
    drakContainer: ElementRef;
    renderSwitch: number;
    collapsed: boolean;
    value?: common.ValueType[];
    drak?: dragula.Drake;
    errorMessage: string;
    buttonGroupStyleString: string;
    invalidIndexes: number[];
    readonly getValue: common.ValueType[];
    ngOnInit(): void;
    readonly isReadOnly: boolean | undefined;
    readonly hasOptionalCheckbox: boolean;
    readonly hasDeleteButtonFunction: boolean;
    readonly hasAddButton: boolean;
    readonly titleToShow: string;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    trackByFunction: (index: number, value: common.ValueType) => number;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    validate(): void;
    addItem(): void;
    onDeleteFunction(i: number): void;
    onChange(i: number, {value, isValid}: common.ValidityValue<common.ValueType>): void;
}
