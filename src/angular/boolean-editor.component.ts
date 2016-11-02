import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "boolean-editor",
    template: `
    <div [class]="theme.row">
        <title-editor [title]="title"
            (onDelete)="onDelete"
            [theme]="theme"
            [icon]="icon"
            [locale]="locale"
            [hasDeleteButton]="hasDeleteButton">
        </title-editor>
        <div *ngIf="!required" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox" (change)="toggleOptional" [checked]="value === undefined" />
                is undefined
            </label>
        </div>
        <div *ngIf="value !== undefined" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox"
                    (change)="onChange"
                    [checked]="value"
                    [readOnly]="readonly || schema.readonly" />
                {{title}}
            </label>
        </div>
        <p [class]="theme.help">{{schema.description}}</p>
    </div>
    `,
})
export class BooleanEditorComponent {
    @Input()
    schema: common.BooleanSchema;
    @Input()
    initialValue: boolean;
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
    @Output()
    onDelete = new EventEmitter();
    @Input()
    readonly?: boolean;
    @Input()
    required?: boolean;
    @Input()
    hasDeleteButton: boolean;

    value?: boolean;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean;
        this.updateValue.emit(this.value);
    }
    onChange(e: { target: { checked: boolean } }) {
        this.value = e.target.checked;
        this.updateValue.emit(this.value);
    }
    toggleOptional() {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue === undefined) as boolean;
        } else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    }
}
