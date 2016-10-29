import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "boolean-editor",
    template: `hello`,
})
export class BooleanEditorComponent {
    @Input()
    schema: common.BooleanSchema;
    @Input()
    initialValue: boolean;
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
    value?: boolean;
    constructor() {
        if (this.required) {
            this.value = common.getDefaultValue(this.schema, this.initialValue) as boolean;
        } else {
            this.value = undefined;
        }
        if (this.value !== this.initialValue) {
            this.updateValue.emit(this.value);
        }
    }
}
