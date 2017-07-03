import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";
import { angularIconTemplateHtml } from "../angular-variables";

@Component({
    selector: "icon",
    template: angularIconTemplateHtml,
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
