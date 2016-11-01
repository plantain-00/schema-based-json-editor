import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "object-editor",
    template: `
    <div>
        <h3>
            {{title || schema.title}}
            <div [class]="theme.buttonGroup" [style="common.buttonGroupStyle">
                <button [class]="theme.button" (click)="collapseOrExpand">{{collapsed ? icon.expand : icon.collapse}}</button>
                <button *ngIf="onDelete && !readonly && !schema.readonly" [class]="theme.button" (click)="onDelete">{{icon.delete}}</button>
            </div>
        </h3>
        <p [class]="theme.help">{{schema.description}}</p>
        <div *ngIf="!required" [class]="theme.optionalCheckbox">
            <label>
                <input type="checkbox" (change)="toggleOptional" [checked]="value === undefined" />
                is undefined
            </label>
        </div>
        <div *ngIf="!collapsed && value !== undefined" [class]="theme.rowContainer">
            <editor *ngFor="let property of properties; let i = index; trackBy: trackByFunction"
                [schema]="schema"
                [title]="schema.title || property.name"
                [initialValue]="value[property.name]"
                (updateValue)="onChange"
                [theme]="theme"
                [icon]="icon"
                [locale]="locale"
                [required]="required"
                [readonly]="readonly || schema.readonly">
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
    properties: { name: string; value: common.ValueType }[] = [];
    constructor() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        for (const property in this.schema.properties) {
            const schema = this.schema.properties[property];
            const required = this.schema.required && this.schema.required.some(r => r === property);
            this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };

            this.properties.push({
                name: property,
                value: schema,
            });
        }
        this.updateValue.emit(this.value);
    }
    trackByFunction(index: number, value: { [name: string]: common.ValueType }) {
        return index;
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
