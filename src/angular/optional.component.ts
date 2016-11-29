import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "optional",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="hasOptionalCheckbox" [class]="theme.optionalCheckbox">
        <label>
            <input type="checkbox" (change)="toggleOptional.emit()" [checked]="value === undefined" [disabled]="isReadOnly" />
            {{locale.info.notExists}}
        </label>
    </div>
    `,
})
export class OptionalComponent {
    @Input()
    required: boolean | undefined;
    @Input()
    value: common.ValueType | undefined;
    @Input()
    isReadOnly: boolean | undefined;
    @Input()
    theme: common.Theme;
    @Input()
    locale: common.Locale;
    @Output()
    toggleOptional = new EventEmitter();

    get hasOptionalCheckbox() {
        return !this.required && (this.value === undefined || !this.isReadOnly);
    }
}
