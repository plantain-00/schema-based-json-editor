import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "null-editor",
    template: `
    <div [class]="theme.row">
        <label *ngIf="title !== undefined && title !== null && title !== ''" [class]="theme.label">
            {{title}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
                <div *ngIf="!required && (value === undefined || !schema.readonly)" [class]="theme.optionalCheckbox">
                    <label>
                        <input type="checkbox" (change)="toggleOptional()" [checked]="value === undefined" [disabled]="readonly || schema.readonly" />
                        is undefined
                    </label>
                </div>
                <button *ngIf="hasDeleteButton" [class]="theme.button" (click)="onDelete.emit()">
                    <icon [icon]="icon" [text]="icon.delete"></icon>
                </button>
            </div>
        </label>
        <p [class]="theme.help">{{schema.description}}</p>
    </div>
    `,
})
export class NullEditorComponent {
    @Input()
    schema: common.NullSchema;
    @Input()
    initialValue: null;
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter<common.ValidityValue<null | undefined>>();
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

    value?: null;
    buttonGroupStyle = common.buttonGroupStyleString;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as null | undefined;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
}
