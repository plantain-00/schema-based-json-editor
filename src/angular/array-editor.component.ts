import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import * as common from "../common";
import { hljs, dragula, MarkdownIt } from "../../typings/lib";

@Component({
    selector: "array-editor",
    template: `
    <div [class]="errorMessage ? theme.errorRow : theme.row">
        <h3>
            {{titleToShow}}
            <div [class]="theme.buttonGroup" [style]="buttonGroupStyleString">
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
                <icon *ngIf="hasAddButton"
                    (onClick)="addItem()"
                    [text]="icon.add"
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
       <description [theme]="theme" [message]="schema.description" [notEmpty]="true"></description>
        <div #drakContainer [class]="theme.rowContainer">
            <div *ngFor="let item of getValue; let i = index; trackBy:trackByFunction" [attr.data-index]="i" [class]="theme.rowContainer">
                <editor [schema]="schema.items"
                    [title]="i"
                    [initialValue]="value[i]"
                    (updateValue)="onChange(i, $event)"
                    [theme]="theme"
                    [icon]="icon"
                    [locale]="locale"
                    [required]="true"
                    [readonly]="isReadOnly"
                    (onDelete)="onDeleteFunction(i)"
                    [hasDeleteButton]="true"
                    [dragula]="dragula"
                    [md]="md"
                    [hljs]="hljs"
                    [forceHttps]="forceHttps">
                </editor>
            </div>
        </div>
        <description [theme]="theme" [message]="errorMessage"></description>
    </div>
    `,
})
export class ArrayEditorComponent {
    @Input()
    schema: common.ArraySchema;
    @Input()
    initialValue: common.ValueType[];
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter<common.ValidityValue<common.ValueType[] | undefined>>();
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

    @ViewChild("drakContainer")
    drakContainer: ElementRef;

    renderSwitch = 1;
    collapsed = false;
    value?: common.ValueType[];
    drak?: dragula.Drake;
    errorMessage: string;
    buttonGroupStyleString = common.buttonGroupStyleString;
    invalidIndexes: number[] = [];
    get getValue() {
        if (this.value !== undefined && !this.collapsed) {
            return this.value;
        }
        return [];
    }
    ngOnInit() {
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[];
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get hasAddButton() {
        return !this.isReadOnly && this.value !== undefined;
    }
    get titleToShow() {
        return common.getTitle(this.title, this.schema.title);
    }
    ngAfterViewInit() {
        if (this.drakContainer && this.dragula) {
            const container = this.drakContainer.nativeElement as HTMLElement;
            this.drak = this.dragula([container]);
            this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
                if (this.value) {
                    common.switchItem(this.value, el, sibling);
                    this.renderSwitch = -this.renderSwitch;
                    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
                }
            });
        }
    }
    ngOnDestroy() {
        if (this.drak) {
            this.drak.destroy();
        }
    }
    trackByFunction = (index: number, value: common.ValueType) => {
        return (1 + index) * this.renderSwitch;
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale);
    }
    addItem() {
        this.value!.push(common.getDefaultValue(true, this.schema.items, undefined) !);
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onDeleteFunction(i: number) {
        this.value!.splice(i, 1);
        this.renderSwitch = -this.renderSwitch;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
    onChange(i: number, {value, isValid}: common.ValidityValue<common.ValueType>) {
        this.value![i] = value;
        this.validate();
        common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i);
        this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 });
    }
}
