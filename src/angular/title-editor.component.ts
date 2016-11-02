import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "title-editor",
    template: `
    <label *ngIf="title" [class]="theme.label">
        {{title}}
        <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
            <button *ngIf="onDelete" [class]="theme.button" (click)="onDelete">{{icon.delete}}</button>
        </div>
    </label>
    `,
})
export class TitleEditorComponent {
    @Input()
    title?: string;
    @Output()
    onDelete?= new EventEmitter();
    @Input()
    theme: common.Theme;
    @Input()
    icon: common.Icon;
    @Input()
    locale: common.Locale;

    buttonGroupStyle = common.buttonGroupStyle;
}
