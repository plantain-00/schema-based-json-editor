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
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
    collapsed: boolean;
    value?: {
        [name: string]: common.ValueType;
    };
    constructor();
    collapseOrExpand: () => void;
    toggleOptional: () => void;
}
