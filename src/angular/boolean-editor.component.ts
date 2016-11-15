import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "boolean-editor",
    template: `
    <div [class]="theme.row">
        <title-editor [title]="title"
            (onDelete)="onDelete.emit()"
            [theme]="theme"
            [icon]="icon"
            [locale]="locale"
            [hasDeleteButton]="hasDeleteButton">
        </title-editor>
        <div *ngIf="!required" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox" (change)="toggleOptional()" [checked]="value === undefined" />
                is undefined
            </label>
        </div>
        <div *ngIf="value !== undefined" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox"
                    (change)="onChange($event)"
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
    updateValue = new EventEmitter<common.ValidityValue<boolean | undefined>>();
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
        this.updateValue.emit({ value: this.value, isValid: true });
    }
    onChange(e: { target: { checked: boolean } }) {
        this.value = e.target.checked;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
}
