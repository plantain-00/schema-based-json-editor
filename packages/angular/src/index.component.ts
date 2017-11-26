import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as common from "schema-based-json-editor";
export * from "schema-based-json-editor";
import { Dragula, MarkdownItType, MarkdownIt, HLJS } from "schema-based-json-editor/dist/libs";
import { indexTemplateHtml } from "./variables";

/**
 * @public
 */
@Component({
    selector: "json-editor",
    template: indexTemplateHtml,
})
export class JSONEditorComponent {
    @Input()
    schema: common.Schema;
    @Input()
    initialValue: common.ValueType;
    @Output()
    updateValue = new EventEmitter<common.ValidityValue<common.ValueType | undefined>>();
    @Input()
    theme?: string;
    @Input()
    icon?: string;
    @Input()
    locale?: common.Locale;
    @Input()
    readonly?: boolean;
    @Input()
    dragula?: Dragula;
    @Input()
    markdownit?: MarkdownItType;
    @Input()
    hljs?: HLJS;
    @Input()
    forceHttps?: boolean;

    themeObject: common.Theme;
    localeObject: common.Locale;
    iconObject: common.Icon;
    md?: MarkdownIt;

    ngOnInit() {
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
        this.iconObject = common.getIcon(this.icon, this.localeObject);
        this.md = common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps);
    }
}
