import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";
import { Dragula, MarkdownIt } from "../libs";
import { angularEditorTemplateHtml } from "../angular-variables";

@Component({
    selector: "editor",
    template: angularEditorTemplateHtml,
})
export class EditorComponent {
    @Input()
    schema: common.ArraySchema;
    @Input()
    initialValue: common.ValueType[];
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter<common.ValidityValue<common.ValueType>>();
    @Input()
    theme: common.Theme;
    @Input()
    icon: common.Icon;
    @Input()
    locale: common.Locale;
    @Output()
    onDelete = new EventEmitter();
    @Input()
    readonly?: boolean;
    @Input()
    required?: boolean;
    @Input()
    hasDeleteButton: boolean;
    @Input()
    dragula?: Dragula;
    @Input()
    md?: MarkdownIt;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;
}
