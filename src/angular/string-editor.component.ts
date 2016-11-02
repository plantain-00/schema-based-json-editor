import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "string-editor",
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
        <title-editor [title]="title"
            (onDelete)="onDelete"
            [theme]="theme"
            [icon]="icon"
            [locale]="locale"
            [hasDeleteButton]="hasDeleteButton">
        </title-editor>
        <div *ngIf="!required" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox" (onChange)="toggleOptional" [checked]="value === undefined" />
                is undefined
            </label>
        </div>
        <textarea *ngIf="useTextArea()"
            [class]="theme.formControl"
            (keyup)="onChange($event)"
            rows="5"
            [readOnly]="readonly || schema.readonly">{{value}}</textarea>
        <input *ngIf="useInput()"
            [class]="theme.formControl"
            [type]="schema.format"
            (keyup)="onChange($event)"
            [defaultValue]="value"
            [readOnly]="readonly || schema.readonly" />
        <select *ngIf="useSelect()"
            [class]="theme.formControl"
            (change)="onChange($event)">
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
export class StringEditorComponent {
    @Input()
    schema: common.StringSchema;
    @Input()
    initialValue: string;
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

    value?: string;
    errorMessage: string;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.validate();
        this.updateValue.emit(this.value);
    }
    useTextArea() {
        return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format === "textarea";
    }
    useInput() {
        return this.value !== undefined && (this.schema.enum === undefined || this.readonly || this.schema.readonly) && this.schema.format !== "textarea";
    }
    useSelect() {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
    }
    onChange(e: { target: { value: string } }) {
        this.value = e.target.value;
        this.validate();
        this.updateValue.emit(this.value);
    }
    validate() {
        if (this.value !== undefined) {
            if (this.schema.minLength !== undefined
                && this.value.length < this.schema.minLength) {
                this.errorMessage = this.locale.error.minLength.replace("{0}", String(this.schema.minLength));
                return;
            }
            if (this.schema.maxLength !== undefined
                && this.value.length > this.schema.maxLength) {
                this.errorMessage = this.locale.error.maxLength.replace("{0}", String(this.schema.maxLength));
                return;
            }
            if (this.schema.pattern !== undefined
                && !new RegExp(this.schema.pattern).test(this.value)) {
                this.errorMessage = this.locale.error.pattern.replace("{0}", String(this.schema.pattern));
                return;
            }
        }

        this.errorMessage = "";
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue) as string;
            this.validate();
        } else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    }
    trackByFunction(index: number, value: { [name: string]: common.ValueType }) {
        return index;
    }
}
