import { Component, Input } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "icon",
    template: `
    <span *ngIf="icon.isText">{{text}}</span>
    <i *ngIf="!icon.isText" [class]="text"></i>
    `,
})
export class IconComponent {
    @Input()
    icon: common.Icon;
    @Input()
    text: string;
}
