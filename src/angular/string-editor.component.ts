import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { hljs, dragula } from "../lib";

@Component({
    selector: "string-editor",
    styles: [
        `.schema-based-json-editor-image-preview {${common.imagePreviewStyleString}}`,
    ],
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
                <button *ngIf="canPreview" [class]="theme.button" (click)="collapseOrExpand()">
                    <icon [icon]="icon" [text]="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
            </div>
        </label>
        <textarea *ngIf="useTextArea"
            [class]="theme.formControl"
            (change)="onChange($event)"
            (keyup)="onChange($event)"
            rows="5"
            [readOnly]="readonly || schema.readonly">{{value}}</textarea>
        <input *ngIf="useInput"
            [class]="theme.formControl"
            [type]="schema.format"
            (change)="onChange($event)"
            (keyup)="onChange($event)"
            [defaultValue]="value"
            [readOnly]="readonly || schema.readonly" />
        <select *ngIf="useSelect"
            [class]="theme.formControl"
            (change)="onChange($event)">
            <option *ngFor="let e of schema.enum; let i = index; trackBy:trackByFunction"
                [value]="e"
                [selected]="value === e">
                {{e}}
            </option>
        </select>
        <img *ngIf="value && !collapsed && canPreviewImage"
            class="schema-based-json-editor-image-preview"
            [src]="getImageUrl" />
        <div *ngIf="value && !collapsed && canPreviewMarkdown" [innerHTML]="getMarkdown">
        </div>
        <pre *ngIf="value && !collapsed && canPreviewCode"><code [innerHTML]="getCode"></code></pre>
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
    @Input()
    dragula?: typeof dragula;
    @Input()
    md?: any;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;

    value?: string;
    errorMessage: string;
    buttonGroupStyle = common.buttonGroupStyleString;
    collapsed = false;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    get useTextArea() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
            && (this.schema.format === "textarea" || this.schema.format === "code" || this.schema.format === "markdown");
    }
    get useInput() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.readonly || this.schema.readonly)
            && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
    }
    get useSelect() {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.readonly && !this.schema.readonly);
    }
    get canPreviewImage() {
        return common.isImageUrl(this.value);
    }
    get canPreviewMarkdown() {
        return this.md && this.schema.format === "markdown";
    }
    get canPreviewCode() {
        return this.hljs && this.schema.format === "code";
    }
    get canPreview() {
        return this.value && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
    }
    get getImageUrl() {
        return this.forceHttps ? common.replaceProtocal(this.value!) : this.value;
    }
    get getMarkdown() {
        return this.md.render(this.value);
    }
    get getCode() {
        return this.hljs!.highlightAuto(this.value!).value;
    }
    onChange(e: { target: { value: string } }) {
        this.value = e.target.value;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.schema, this.locale);
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
