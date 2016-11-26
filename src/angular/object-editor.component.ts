import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { hljs, dragula } from "../lib";

@Component({
    selector: "object-editor",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div [class]="theme.row">
        <h3>
            {{title || schema.title}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
                <div *ngIf="!required && (value === undefined || !schema.readonly)" [class]="theme.optionalCheckbox">
                    <label>
                        <input type="checkbox" (change)="toggleOptional()" [checked]="value === undefined" [disabled]="readonly || schema.readonly" />
                        is undefined
                    </label>
                </div>
                <button [class]="theme.button" (click)="collapseOrExpand()">
                    <icon [icon]="icon" [text]="collapsed ? icon.expand : icon.collapse"></icon>
                </button>
                <button *ngIf="hasDeleteButtonFunction" [class]="theme.button" (click)="onDelete.emit()">{{icon.delete}}</button>
            </div>
        </h3>
        <p [class]="theme.help">{{schema.description}}</p>
        <div *ngIf="!collapsed && value !== undefined" [class]="theme.rowContainer">
            <editor *ngFor="let property of properties; trackBy: trackByFunction"
                [schema]="property.value"
                [title]="property.value.title || property.name"
                [initialValue]="value[property.name]"
                (updateValue)="onChange(property.name, $event)"
                [theme]="theme"
                [icon]="icon"
                [locale]="locale"
                [required]="isRequired(property.name)"
                [readonly]="readonly || schema.readonly"
                [dragula]="dragula"
                [md]="md"
                [hljs]="hljs"
                [forceHttps]="forceHttps">
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
    updateValue = new EventEmitter<common.ValidityValue<{ [name: string]: common.ValueType } | undefined>>();
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
    dragula?: typeof dragula;
    @Input()
    md?: any;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;

    collapsed = false;
    value?: { [name: string]: common.ValueType };
    properties: { name: string; value: common.ValueType }[] = [];
    buttonGroupStyle = common.buttonGroupStyleString;
    invalidProperties: string[] = [];
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        if (!this.collapsed && this.value !== undefined) {
            for (const property in this.schema.properties) {
                const schema = this.schema.properties[property];
                const required = this.schema.required && this.schema.required.some(r => r === property);
                this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };

                this.properties.push({
                    name: property,
                    value: schema,
                });
            }
        }
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    isRequired(property: string) {
        return this.schema.required && this.schema.required.some(r => r === property);
    }
    trackByFunction(index: number, value: { [name: string]: common.ValueType }) {
        return index;
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onChange(property: string, {value, isValid}: common.ValidityValue<{ [name: string]: common.ValueType }>) {
        this.value![property] = value;
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.readonly && !this.schema.readonly;
    }
}
