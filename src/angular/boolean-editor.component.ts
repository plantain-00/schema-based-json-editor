import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "boolean-editor",
    template: `
    <div [class]="theme.row">
        <label [class]="theme.label">
            {{titleToShow}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
                <icon *ngIf="!isReadOnly"
                    (onClick)="toggleLocked()"
                    [text]="locked ? icon.unlock : icon.lock"
                    [theme]="theme"
                    [icon]="icon">
                </icon>
                <optional [required]="required"
                    [value]="value"
                    [isReadOnly]="isReadOnly || isLocked"
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
            </div>
        </label>
        <div *ngIf="value !== undefined">
            <div [class]="theme.radiobox">
                <label>
                    <input type="radio"
                        (change)="onChange($event)"
                        [checked]="value"
                        [disabled]="isReadOnly || isLocked" />
                    {{locale.info.true}}
                </label>
            </div>
            <div [class]="theme.radiobox">
                <label>
                    <input type="radio"
                        (change)="onChange($event)"
                        [checked]="!value"
                        [disabled]="isReadOnly || isLocked" />
                    {{locale.info.false}}
                </label>
            </div>
        </div>
        <description [theme]="theme" [message]="schema.description"></description>
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
    @Input()
    parentIsLocked?: boolean;

    value?: boolean;
    buttonGroupStyle = common.buttonGroupStyleString;
    locked = true;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as boolean;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
    onChange(e: { target: { checked: boolean } }) {
        this.value = !this.value;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as boolean | undefined;
        this.updateValue.emit({ value: this.value, isValid: true });
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get isLocked() {
        return this.parentIsLocked !== false && this.locked;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly && !this.isLocked;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }
    toggleLocked = () => {
        this.locked = !this.locked;
    }
}
