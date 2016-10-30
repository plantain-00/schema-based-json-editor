/// <reference types="dragula" />
import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class ArrayEditorComponent {
    schema: common.ArraySchema;
    initialValue: common.ValueType[];
    title?: string;
    updateValue: EventEmitter<{}>;
    theme: string;
    icon: string;
    locale: string;
    onDelete: EventEmitter<{}>;
    readonly?: boolean;
    required?: boolean;
    renderSwitch: number;
    collapsed: boolean;
    value?: common.ValueType[];
    drak: common.dragula.Drake;
    constructor();
    getDragulaContainer(): void;
    ngOnDestroy(): void;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
}
