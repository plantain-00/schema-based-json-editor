import { Component, Input } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "description",
    template: `
    <p *ngIf="notEmpty || message" [class]="theme.help">{{message}}</p>
    `,
})
export class DescriptionComponent {
    @Input()
    theme: common.Theme;
    @Input()
    message: string | undefined;
    @Input()
    notEmpty?: boolean;
}
