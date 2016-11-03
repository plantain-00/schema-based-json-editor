import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class ObjectEditorComponent {
    schema: common.ObjectSchema;
    initialValue: {
        [name: string]: common.ValueType;
    };
    title?: string;
    updateValue: EventEmitter<{}>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    onDelete: EventEmitter<{}>;
    readonly?: boolean;
    required?: boolean;
    hasDeleteButton: boolean;
    collapsed: boolean;
    value?: {
        [name: string]: common.ValueType;
    };
    properties: {
        name: string;
        value: common.ValueType;
    }[];
    buttonGroupStyle: {
        marginLeft: string;
    };
    ngOnInit(): void;
    isRequired(property: string): boolean | undefined;
    trackByFunction(index: number, value: {
        [name: string]: common.ValueType;
    }): number;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    onChange(property: string, value: common.ValueType): void;
    hasDeleteButtonFunction(): boolean;
}
