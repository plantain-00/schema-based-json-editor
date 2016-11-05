/// <reference types="dragula" />
import { EventEmitter, ElementRef } from "@angular/core";
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
    hasDeleteButton: boolean;
    drakContainer: ElementRef;
    renderSwitch: number;
    collapsed: boolean;
    value?: common.ValueType[];
    drak: common.dragula.Drake;
    errorMessage: string;
    buttonGroupStyleString: string;
    getValue(): common.ValueType[];
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getDragulaContainer(): HTMLElement | undefined;
    ngOnDestroy(): void;
    trackByFunction: (index: number, value: common.ValueType) => number;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    validate(): void;
    addItem(): void;
    hasDeleteButtonFunction(): boolean;
    onDeleteFunction(i: number): void;
    onChange(i: number, value: common.ValueType): void;
}
