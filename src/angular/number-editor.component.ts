import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "number-editor",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
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
        <input *ngIf="useInput"
            [class]="theme.formControl"
            type="number"
            (change)="onChange($event)"
            (keyup)="onChange($event)"
            [defaultValue]="value"
            [readOnly]="readonly || schema.readonly" />
        <select *ngIf="useSelect"
            [class]="theme.formControl"
            type="number"
            (change)="onChange">
            <option *ngFor="let e of schema.enum; let i = index; trackBy:trackByFunction"
                [value]="e"
                [selected]="value === e">
                {{e}}
            </option>
        </select>
        <p [class]="theme.help">{{schema.description}}</p>
        <p *ngIf="errorMessage" [class]="theme.help">{{errorMessage}}</p>
    </div>
    `,
})
export class NumberEditorComponent {
    @Input()
    schema: common.NumberSchema;
    @Input()
    initialValue: number;
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter<common.ValidityValue<number | undefined>>();
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

    value?: number;
    errorMessage: string;
    buttonGroupStyle = common.buttonGroupStyleString;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number;
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    get useInput() {
        return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly);
    }
    get useSelect() {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
    }
    onChange(e: { target: { value: string } }) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    trackByFunction(index: number, value: number) {
        return index;
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale);
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
}
