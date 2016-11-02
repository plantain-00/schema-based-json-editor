import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "json-editor",
    template: `
    <object-editor *ngIf="schema.type === 'object'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true">
    </object-editor>
    <array-editor *ngIf="schema.type === 'array'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true">
    </array-editor>
    <number-editor *ngIf="schema.type === 'number' || schema.type === 'integer'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true">
    </number-editor>
    <boolean-editor *ngIf="schema.type === 'boolean'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true">
    </boolean-editor>
    <null-editor *ngIf="schema.type === 'null'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true">
    </null-editor>
    <string-editor *ngIf="schema.type === 'string'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true">
    </string-editor>
    `,
})
export class JSONEditorComponent {
    @Input()
    schema: common.Schema;
    @Input()
    initialValue: common.ValueType;
    @Output()
    updateValue = new EventEmitter();
    @Input()
    theme?: string;
    @Input()
    icon?: string;
    @Input()
    locale?: string;
    @Input()
    readonly?: boolean;

    themeObject: common.Theme;
    localeObject: common.Locale;
    iconObject: common.Icon;
    ngOnInit() {
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
        this.iconObject = common.getIcon(this.icon, this.localeObject);
    }
}

import { BooleanEditorComponent } from "./boolean-editor.component";
export { BooleanEditorComponent };

import { ArrayEditorComponent } from "./array-editor.component";
export { ArrayEditorComponent };

import { EditorComponent } from "./editor.component";
export { EditorComponent };

import { NullEditorComponent } from "./null-editor.component";
export { NullEditorComponent };

import { NumberEditorComponent } from "./number-editor.component";
export { NumberEditorComponent };

import { ObjectEditorComponent } from "./object-editor.component";
export { ObjectEditorComponent };

import { StringEditorComponent } from "./string-editor.component";
export { StringEditorComponent };

import { TitleEditorComponent } from "./title-editor.component";
export { TitleEditorComponent };

import { IconComponent } from "./icon.component";
export { IconComponent };
