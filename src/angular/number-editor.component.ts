import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { srcAngularNumberEditorTemplateHtml } from "../angular-variables";

@Component({
    selector: "number-editor",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: srcAngularNumberEditorTemplateHtml,
})
export class NumberEditorComponent {
    @Input()
    schema: common.NumberSchema;
    @Input()
    initialValue: number;
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter<common.ValidityValue<number | undefined>>();
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

    value?: number;
    errorMessage: string;
    buttonGroupStyle = common.buttonGroupStyleString;
    locked = true;
    onChange(e: { target: { value: string } }) {
        this.value = this.schema.type === "integer" ? common.toInteger(e.target.value) : common.toNumber(e.target.value);
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as number;
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    get useInput() {
        return this.value !== undefined && (this.schema.enum === undefined || this.isReadOnly || this.isLocked);
    }
    get useSelect() {
        return this.value !== undefined && (this.schema.enum !== undefined && !this.isReadOnly && !this.isLocked);
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
    trackByFunction(index: number, value: number) {
        return index;
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.schema, this.locale);
    }
    toggleOptional() {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as number | undefined;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage });
    }
    toggleLocked = () => {
        this.locked = !this.locked;
    }
}
