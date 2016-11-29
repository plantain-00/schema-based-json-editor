import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "icon",
    template: `
    <button [class]="theme.button" (click)="onClick.emit()">
        <span *ngIf="icon.isText">{{text}}</span>
        <i *ngIf="!icon.isText" [class]="text"></i>
    </button>
    `,
})
export class IconComponent {
    @Input()
    icon: common.Icon;
    @Input()
    text: string;
    @Output()
    onClick = new EventEmitter();
    @Input()
    theme: common.Theme;
}
