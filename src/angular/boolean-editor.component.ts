import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "boolean-editor",
    template: `
    <div className={this.props.theme.row}>
        <title-editor {...this.props} />
        <div *ngIf="!required" className={this.props.theme.optionalCheckbox}>
            <label>
                <input type="checkbox" onChange={this.toggleOptional} checked={this.value === undefined} />
                is undefined
            </label>
        </div>
        <div *ngIf="value !== undefined" className={this.props.theme.optionalCheckbox}>
            <label>
                <input type="checkbox"
                    onChange={this.onChange}
                    checked={this.value}
                    readOnly={this.props.readonly || this.props.schema.readonly} />
                {this.props.title}
            </label>
        </div>
        <p className={this.props.theme.help}>{this.props.schema.description}</p>
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
    onChange(e: { target: { checked: boolean } }) {
        this.value = e.target.checked;
        this.updateValue.emit(this.value);
    }
    toggleOptional() {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(this.schema, this.initialValue === undefined) as boolean;
        } else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    }
}
