import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";
import { srcAngularIconTemplateHtml } from "../angular-variables";

@Component({
    selector: "icon",
    template: srcAngularIconTemplateHtml,
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
