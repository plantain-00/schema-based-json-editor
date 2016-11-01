import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "string-editor",
    template: `
    <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
        <title-editor {...this.props}></title-editor>
        <div *ngIf="!required" className={this.props.theme.optionalCheckbox}>
            <label>
                <input type="checkbox" onChange={this.toggleOptional} checked={this.value === undefined} />
                is undefined
            </label>
        </div>
        <textarea *ngIf="value !== undefined && (schema.enum === undefined || readonly || schema.readonly) && schema.format === 'textarea'"
            className={this.props.theme.formControl}
            onChange={this.onChange}
            defaultValue={this.value}
            rows={5}
            readOnly={this.props.readonly || this.props.schema.readonly} >
        </textarea>
        <input *ngIf="value !== undefined && (schema.enum === undefined || readonly || schema.readonly) && schema.format !== 'textarea'"
            className={this.props.theme.formControl}
            type={this.props.schema.format}
            onChange={this.onChange}
            defaultValue={this.value}
            readOnly={this.props.readonly || this.props.schema.readonly} />
        <select *ngIf="value !== undefined && (schema.enum !== undefined && readonly && schema.readonly)"
            className={this.props.theme.formControl}
            onChange={this.onChange}
            defaultValue={this.value}>
            <option *ngFor="let e of schema.enum" key={i} value={e} >{e}</option>
        </select>
        <p className={this.props.theme.help}>{this.props.schema.description}</p>
        <p *ngIf="errorMessage" className={this.props.theme.help}>{this.errorMessage}</p>
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

    value?: string;
    errorMessage: string;
    constructor() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as string;
        this.validate();
        this.updateValue.emit(this.value);
    }
    onChange(e: { target: { value: string } }) {
        this.value = e.target.value;
        this.validate();
        this.updateValue.emit(this.value);
    }
    validate() {
        if (this.value !== undefined) {
            if (this.schema.minLength !== undefined
                && this.value.length < this.schema.minLength) {
                this.errorMessage = this.locale.error.minLength.replace("{0}", String(this.schema.minLength));
                return;
            }
            if (this.schema.maxLength !== undefined
                && this.value.length > this.schema.maxLength) {
                this.errorMessage = this.locale.error.maxLength.replace("{0}", String(this.schema.maxLength));
                return;
            }
            if (this.schema.pattern !== undefined
                && !this.value.match(this.schema.pattern)) {
                this.errorMessage = this.locale.error.pattern.replace("{0}", String(this.schema.pattern));
                return;
            }
        }

        this.errorMessage = "";
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue) as string;
            this.validate();
        } else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    }
}
