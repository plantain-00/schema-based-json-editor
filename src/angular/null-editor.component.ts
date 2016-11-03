import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "null-editor",
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

    value?: null;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null;
        this.updateValue.emit(this.value as any);
    }
    toggleOptional() {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue) as null;
        } else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value as any);
    }
}
