import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "object-editor",
    template: `
    <div>
        <h3>
            {this.props.title || this.props.schema.title}
            <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                <button className={this.props.theme.button} onClick={this.collapseOrExpand}>{this.collapsed ? this.props.icon.expand : this.props.icon.collapse}</button>
                <button *ngIf="onDelete && !readonly && !schema.readonly" className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>
            </div>
        </h3>
        <p className={this.props.theme.help}>{this.props.schema.description}</p>
        <div *ngIf="!required" className={this.props.theme.optionalCheckbox}>
            <label>
                <input type="checkbox" onChange={this.toggleOptional} checked={this.value === undefined} />
                is undefined
            </label>
        </div>
        <div *ngIf="!collapsed && value !== undefined" className={this.props.theme.rowContainer}>
            <editor *ngFor="let property of schema.properties" key={property}
                schema={schema}
                title={schema.title || property}
                initialValue={this.value[property]}
                updateValue={onChange}
                theme={this.props.theme}
                icon={this.props.icon}
                locale={this.props.locale}
                required={required}
                readonly={this.props.readonly || this.props.schema.readonly}>
            </editor>
        </div>
    </div >
    `,
})
export class ObjectEditorComponent {
    @Input()
    schema: common.ObjectSchema;
    @Input()
    initialValue: { [name: string]: common.ValueType };
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

    collapsed = false;
    value?: { [name: string]: common.ValueType };
    constructor() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        for (const property in this.schema.properties) {
            const schema = this.schema.properties[property];
            const required = this.schema.required && this.schema.required.some(r => r === property);
            this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };
        }
        this.updateValue.emit(this.value);
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        } else {
            this.value = undefined;
        }
        this.updateValue.emit(this.value);
    }
}
