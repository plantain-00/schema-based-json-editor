import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "editor",
    template: `
    <object-editor *ngIf="schema.type === 'object'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="theme"
        [locale]="locale"
        [icon]="icon"
        [required]="required"
        (updateValue)="updateValueFunction($event)">
    </object-editor>
    <array-editor *ngIf="schema.type === 'array'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="theme"
        [locale]="locale"
        [icon]="icon"
        [required]="required"
        (updateValue)="updateValueFunction($event)">
    </array-editor>
    <number-editor *ngIf="schema.type === 'number' || schema.type === 'integer'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="theme"
        [locale]="locale"
        [icon]="icon"
        [required]="required"
        (updateValue)="updateValueFunction($event)">
    </number-editor>
    <boolean-editor *ngIf="schema.type === 'boolean'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="theme"
        [locale]="locale"
        [icon]="icon"
        [required]="required"
        (updateValue)="updateValueFunction($event)">
    </boolean-editor>
    <null-editor *ngIf="schema.type === 'null'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="theme"
        [locale]="locale"
        [icon]="icon"
        [required]="required"
        (updateValue)="updateValueFunction($event)">
    </null-editor>
    <string-editor *ngIf="schema.type === 'string'"
        [schema]="schema"
        [initialValue]="initialValue"
        [title]="title"
        [theme]="theme"
        [locale]="locale"
        [icon]="icon"
        [required]="required"
        (updateValue)="updateValueFunction($event)">
    </string-editor>
    `,
})
export class EditorComponent {
    @Input()
    schema: common.ArraySchema;
    @Input()
    initialValue: common.ValueType[];
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter();
    @Input()
    theme: common.Theme;
    @Input()
    icon: common.Icon;
    @Input()
    locale: common.Locale;
    onDelete = new EventEmitter();
    @Input()
    readonly?: boolean;
    @Input()
    required?: boolean;

    updateValueFunction(value: any) {
        this.updateValue.emit(value);
    }
}
