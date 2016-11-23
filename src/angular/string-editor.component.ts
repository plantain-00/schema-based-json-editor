import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "string-editor",
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
        <label *ngIf="title !== undefined && title !== null && title !== ''" [class]="theme.label">
            {{title}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
                <button *ngIf="hasDeleteButton" [class]="theme.button" (click)="onDelete.emit()">
                    <icon [icon]="icon" [text]="icon.delete"></icon>
                </button>
                <button *ngIf="isImageUrl" [class]="theme.button" (click)="collapseOrExpand()">
                    <icon [icon]="icon" [text]="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
            </div>
        </label>
        <div *ngIf="!required" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox" (change)="toggleOptional()" [checked]="value === undefined" />
                is undefined
            </label>
        </div>
        <textarea *ngIf="useTextArea()"
            [class]="theme.formControl"
            (change)="onChange($event)"
            (keyup)="onChange($event)"
            rows="5"
            [readOnly]="readonly || schema.readonly">{{value}}</textarea>
        <input *ngIf="useInput()"
            [class]="theme.formControl"
            [type]="schema.format"
            (change)="onChange($event)"
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
        <img *ngIf="isImageUrl && !collapsed" [src]="value" />
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
    updateValue = new EventEmitter<common.ValidityValue<string | undefined>>();
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
    isImageUrl: boolean;
    buttonGroupStyle = common.buttonGroupStyle;
    collapsed = false;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
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
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
        this.isImageUrl = common.isImageUrl(this.value);
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as string | undefined;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    trackByFunction(index: number, value: { [name: string]: common.ValueType }) {
        return index;
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
    }
}
