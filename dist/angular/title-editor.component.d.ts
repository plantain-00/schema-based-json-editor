import { EventEmitter } from "@angular/core";
import * as common from "../common";
export declare class TitleEditorComponent {
    title?: string;
    onDelete?: EventEmitter<{}> | undefined;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
}
