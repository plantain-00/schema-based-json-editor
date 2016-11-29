import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "boolean-editor",
    template: `
    <div [class]="theme.row">
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
                <button *ngIf="hasDeleteButton" [class]="theme.button" (click)="onDelete.emit()">
                    <icon [icon]="icon" [text]="icon.delete"></icon>
                </button>
            </div>
        </label>
        <div *ngIf="value !== undefined">
            <div [class]="theme.radiobox">
                <label>
                    <input type="radio"
                        (change)="onChange($event)"
                        [checked]="value"
                        [disabled]="isReadOnly" />
                    {{locale.info.true}}
                </label>
            </div>
            <div [class]="theme.radiobox">
                <label>
                    <input type="radio"
                        (change)="onChange($event)"
                        [checked]="!value"
                        [disabled]="isReadOnly" />
                    {{locale.info.false}}
                </label>
            </div>
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
    buttonGroupStyle = common.buttonGroupStyleString;
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
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }
}
