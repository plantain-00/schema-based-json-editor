import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { angularOptionalTemplateHtml } from "../angular-variables";

@Component({
    selector: "optional",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: angularOptionalTemplateHtml,
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
