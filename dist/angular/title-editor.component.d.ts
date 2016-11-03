import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class TitleEditorComponent {
    title?: string;
    onDelete: EventEmitter<{}>;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
    hasDeleteButton: boolean;
    buttonGroupStyle: {
        marginLeft: string;
    };
}
