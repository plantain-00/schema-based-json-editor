import { Component, Input, Output, EventEmitter, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as common from "./common";
export * from "./common";
import { Dragula, MarkdownIt } from "./libs";
import { angularTemplateHtml } from "./angular-variables";
import { MarkdownTipModule } from "markdown-tip/angular";

@Component({
    selector: "json-editor",
    template: angularTemplateHtml,
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
    markdownit?: any;
    @Input()
    hljs?: typeof hljs;
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

@NgModule({
    declarations: [
        JSONEditorComponent,
        BooleanEditorComponent,
        ArrayEditorComponent,
        EditorComponent,
        NullEditorComponent,
        NumberEditorComponent,
        ObjectEditorComponent,
        StringEditorComponent,
        IconComponent,
        OptionalComponent,
        DescriptionComponent,
    ],
    imports: [
        CommonModule,
        MarkdownTipModule,
    ],
    exports: [
        JSONEditorComponent,
        BooleanEditorComponent,
        ArrayEditorComponent,
        EditorComponent,
        NullEditorComponent,
        NumberEditorComponent,
        ObjectEditorComponent,
        StringEditorComponent,
        IconComponent,
        OptionalComponent,
        DescriptionComponent,
    ],
})
export class JSONEditorModule { }

import { BooleanEditorComponent } from "./angular/boolean-editor.component";
export { BooleanEditorComponent };

import { ArrayEditorComponent } from "./angular/array-editor.component";
export { ArrayEditorComponent };

import { EditorComponent } from "./angular/editor.component";
export { EditorComponent };

import { NullEditorComponent } from "./angular/null-editor.component";
export { NullEditorComponent };

import { NumberEditorComponent } from "./angular/number-editor.component";
export { NumberEditorComponent };

import { ObjectEditorComponent } from "./angular/object-editor.component";
export { ObjectEditorComponent };

import { StringEditorComponent } from "./angular/string-editor.component";
export { StringEditorComponent };

import { IconComponent } from "./angular/icon.component";
export { IconComponent };

import { OptionalComponent } from "./angular/optional.component";
export { OptionalComponent };

import { DescriptionComponent } from "./angular/description.component";
export { DescriptionComponent };
