import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "number-editor",
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
        <title-editor></title-editor>
        <div *ngIf="!required" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox" (change)="toggleOptional" [checked]="value === undefined" />
                is undefined
            </label>
        </div>
        <input *ngIf="value !== undefined && (schema.enum === undefined || readonly || schema.readonly)"
            [class]="theme.formControl"
            type="number"
            (change)="onChange"
            [defaultValue]="value"
            [readOnly]="readonly || schema.readonly" />
        <select *ngIf="value !== undefined && (schema.enum !== undefined && !readonly && !schema.readonly)"
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
    updateValue = new EventEmitter();
    @Input()
    theme: common.Theme;
    @Input()
    icon: common.Icon;
    @Input()
    locale: common.Locale;
    @Output()
    onDelete?: () => void;
    @Input()
    readonly?: boolean;
    @Input()
    required?: boolean;

    value?: number;
    errorMessage: string;
    constructor() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number;
        // this.updateValue.emit(this.value);
    }
    onChange(e: { target: { value: string } }) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.updateValue.emit(this.value);
    }
    trackByFunction(index: number, value: number) {
        return index;
    }
    validate() {
        if (this.value !== undefined) {
            if (this.schema.minimum !== undefined) {
                if (this.schema.exclusiveMinimum) {
                    if (this.value <= this.schema.minimum) {
                        this.errorMessage = this.locale.error.largerThan.replace("{0}", String(this.schema.minimum));
                        return;
                    }
                } else {
                    if (this.value < this.schema.minimum) {
                        this.errorMessage = this.locale.error.minimum.replace("{0}", String(this.schema.minimum));
                        return;
                    }
                }
            }
            if (this.schema.maximum !== undefined) {
                if (this.schema.exclusiveMaximum) {
                    if (this.value >= this.schema.maximum) {
                        this.errorMessage = this.locale.error.smallerThan.replace("{0}", String(this.schema.maximum));
                        return;
                    }
                } else {
                    if (this.value > this.schema.maximum) {
                        this.errorMessage = this.locale.error.maximum.replace("{0}", String(this.schema.maximum));
                        return;
                    }
                }
            }
        }

        this.errorMessage = "";
    }
    toggleOptional() {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue) as number;
        } else {
            this.value = undefined;
        }
        // this.updateValue.emit(this.value);
    }
}
