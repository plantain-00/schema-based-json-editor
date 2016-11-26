import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "./common";
import { hljs, dragula } from "../typings/lib";

@Component({
    selector: "json-editor",
    template: `
    <object-editor *ngIf="schema.type === 'object'"
        [schema]="schema"
        [initialValue]="initialValue"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true"
        (updateValue)="updateValueFunction($event)"
        [dragula]="dragula"
        [md]="md"
        [hljs]="hljs"
        [forceHttps]="forceHttps">
    </object-editor>
    <array-editor *ngIf="schema.type === 'array'"
        [schema]="schema"
        [initialValue]="initialValue"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true"
        (updateValue)="updateValueFunction($event)"
        [dragula]="dragula"
        [md]="md"
        [hljs]="hljs"
        [forceHttps]="forceHttps">
    </array-editor>
    <number-editor *ngIf="schema.type === 'number' || schema.type === 'integer'"
        [schema]="schema"
        [initialValue]="initialValue"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true"
        (updateValue)="updateValueFunction($event)">
    </number-editor>
    <boolean-editor *ngIf="schema.type === 'boolean'"
        [schema]="schema"
        [initialValue]="initialValue"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true"
        (updateValue)="updateValueFunction($event)">
    </boolean-editor>
    <null-editor *ngIf="schema.type === 'null'"
        [schema]="schema"
        [initialValue]="initialValue"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true"
        (updateValue)="updateValueFunction($event)">
    </null-editor>
    <string-editor *ngIf="schema.type === 'string'"
        [schema]="schema"
        [initialValue]="initialValue"
        [theme]="themeObject"
        [locale]="localeObject"
        [icon]="iconObject"
        [required]="true"
        (updateValue)="updateValueFunction($event)"
        [dragula]="dragula"
        [md]="md"
        [hljs]="hljs"
        [forceHttps]="forceHttps">
    </string-editor>
    `,
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
    locale?: string;
    @Input()
    readonly?: boolean;
    @Input()
    dragula?: typeof dragula;
    @Input()
    markdownit?: any;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;

    themeObject: common.Theme;
    localeObject: common.Locale;
    iconObject: common.Icon;
    md: any;

    updateValueFunction = common.debounce((value: common.ValidityValue<common.ValueType | undefined>) => {
        this.updateValue.emit(value);
    }, 100);
    ngOnInit() {
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
        this.iconObject = common.getIcon(this.icon, this.localeObject);
        this.md = common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps);
    }
}
import { Cancelable } from "lodash";
export type Cancelable = Cancelable;

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
