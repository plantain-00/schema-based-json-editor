import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { hljs, dragula, MarkdownIt } from "../../typings/lib";

@Component({
    selector: "object-editor",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
        <h3>
            {{titleToShow}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyle">
                <optional [required]="required"
                    [value]="value"
                    [isReadOnly]="isReadOnly"
                    [theme]="theme"
                    [locale]="locale"
                    (toggleOptional)="toggleOptional()">
                </optional>
                <icon (onClick)="collapseOrExpand()"
                    [text]="collapsed ? icon.expand : icon.collapse"
                    [theme]="theme"
                    [icon]="icon">
                </icon>
                <icon *ngIf="hasDeleteButtonFunction"
                    (onClick)="onDelete.emit()"
                    [text]="icon.delete"
                    [theme]="theme"
                    [icon]="icon">
                </icon>
            </div>
        </h3>
        <description [theme]="theme" [message]="schema.description"></description>
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
                [readonly]="isReadOnly"
                [dragula]="dragula"
                [md]="md"
                [hljs]="hljs"
                [forceHttps]="forceHttps">
            </editor>
        </div>
        <description [theme]="theme" [message]="errorMessage"></description>
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
    md?: MarkdownIt.MarkdownIt;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;

    collapsed = false;
    value?: { [name: string]: common.ValueType };
    properties: { name: string; value: common.ValueType }[] = [];
    buttonGroupStyle = common.buttonGroupStyleString;
    invalidProperties: string[] = [];
    errorMessage: string;
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        this.validate();
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
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onChange(property: string, {value, isValid}: common.ValidityValue<{ [name: string]: common.ValueType }>) {
        this.value![property] = value;
        this.validate();
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale);
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get titleToShow() {
        if (this.hasDeleteButton) {
            return common.getTitle(common.findTitle(this.value), this.title, this.schema.title);
        }
        return common.getTitle(this.title, this.schema.title);
    }
}
