import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { hljs, dragula, MarkdownIt } from "../../typings/lib";

@Component({
    selector: "string-editor",
    styles: [
        `.schema-based-json-editor-image-preview {${common.imagePreviewStyleString}}`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
        <label [class]="theme.label">
            {{titleToShow}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
                <optional [required]="required"
                    [value]="value"
                    [isReadOnly]="isReadOnly"
                    [theme]="theme"
                    [locale]="locale"
                    (toggleOptional)="toggleOptional()">
                </optional>
                <icon *ngIf="hasDeleteButtonFunction"
                    (onClick)="onDelete.emit()"
                    [text]="icon.delete"
                    [theme]="theme"
                    [icon]="icon">
                </icon>
                <icon *ngIf="canPreview"
                    (onClick)="collapseOrExpand()"
                    [text]="collapsed ? icon.expand : icon.collapse"
                    [theme]="theme"
                    [icon]="icon">
                </icon>
                <icon *ngIf="hasLockButton"
                    (onClick)="toggleLocked()"
                    [text]="locked ? icon.unlock : icon.lock"
                    [theme]="theme"
                    [icon]="icon">
                </icon>
            </div>
        </label>
        <textarea *ngIf="useTextArea"
            [class]="theme.formControl"
            (change)="onChange($event)"
            (keyup)="onChange($event)"
            rows="10"
            [readOnly]="isReadOnly">{{value}}</textarea>
        <input *ngIf="useInput"
            [class]="theme.formControl"
            [type]="schema.format"
            (change)="onChange($event)"
            (keyup)="onChange($event)"
            [defaultValue]="value"
            [readOnly]="isReadOnly" />
        <select *ngIf="useSelect"
            [class]="theme.formControl"
            (change)="onChange($event)">
            <option *ngFor="let e of schema.enum; let i = index; trackBy:trackByFunction"
                [value]="e"
                [selected]="value === e">
                {{e}}
            </option>
        </select>
        <img *ngIf="willPreviewImage"
            class="schema-based-json-editor-image-preview"
            [src]="getImageUrl" />
        <div *ngIf="willPreviewMarkdown" [innerHTML]="getMarkdown">
        </div>
        <pre *ngIf="willPreviewCode"><code [innerHTML]="getCode"></code></pre>
        <description [theme]="theme" [message]="schema.description"></description>
        <description [theme]="theme" [message]="errorMessage"></description>
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
    md?: MarkdownIt.MarkdownIt;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;

    value?: string;
    errorMessage: string;
    buttonGroupStyle = common.buttonGroupStyleString;
    collapsed = false;
    locked = true;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    get useTextArea() {
        const isUnlockedCodeOrMarkdown = (this.schema.format === "code" || this.schema.format === "markdown") && (!this.locked);
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format === "textarea" || isUnlockedCodeOrMarkdown);
    }
    get useInput() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format !== "textarea" && this.schema.format !== "code" && this.schema.format !== "markdown");
    }
    get useSelect() {
        return this.value !== undefined && this.schema.enum !== undefined && !this.isReadOnly;
    }
    get hasLockButton() {
        return this.value !== undefined
            && (this.schema.enum === undefined || this.isReadOnly)
            && (this.schema.format === "code" || this.schema.format === "markdown");
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
        return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
    }
    get getImageUrl() {
        return this.forceHttps ? common.replaceProtocal(this.value!) : this.value;
    }
    get getMarkdown() {
        return this.md!.render(this.value!);
    }
    get getCode() {
        return this.hljs!.highlightAuto(this.value!).value;
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get willPreviewImage() {
        return this.value && !this.collapsed && this.canPreviewImage;
    }
    get willPreviewMarkdown() {
        return this.value && !this.collapsed && this.canPreviewMarkdown;
    }
    get willPreviewCode() {
        return this.value && !this.collapsed && this.canPreviewCode;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
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
    toggleLocked = () => {
        this.locked = !this.locked;
    }
}
