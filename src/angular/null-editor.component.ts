import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "null-editor",
    template: `
    <div>
        <title-editor {...this.props}></title-editor>
        <div *ngIf="!this.required" className={this.props.theme.optionalCheckbox}>
            <label>
                <input type="checkbox" onChange={this.toggleOptional} checked={this.value === undefined} />
                is undefined
            </label>
        </div>
        <p className={this.props.theme.help}>{this.props.schema.description}</p>
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
    onDelete?: () => void;
    @Input()
    readonly?: boolean;
    @Input()
    required?: boolean;

    value?: null;
    constructor() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as null;
        // this.updateValue.emit(this.value);
    }
    toggleOptional() {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue) as null;
        } else {
            this.value = undefined;
        }
        // this.updateValue.emit(this.value);
    }
}
