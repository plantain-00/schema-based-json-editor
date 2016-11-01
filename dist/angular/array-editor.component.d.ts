/// <reference types="dragula" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class ArrayEditorComponent {
    schema: common.ArraySchema;
    initialValue: common.ValueType[];
    title?: string;
    updateValue: EventEmitter<{}>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete: EventEmitter<{}>;
    readonly?: boolean;
    required?: boolean;
    renderSwitch: number;
    collapsed: boolean;
    value?: common.ValueType[];
    drak: common.dragula.Drake;
    errorMessage: string;
    constructor();
    getDragulaContainer(): void;
    ngOnDestroy(): void;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    validate(): void;
    addItem(): void;
}