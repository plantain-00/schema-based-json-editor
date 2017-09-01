import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import * as common from "../common";
import { Dragula, MarkdownIt } from "../libs";
import { angularObjectEditorTemplateHtml } from "../angular-variables";

@Component({
    selector: "object-editor",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: angularObjectEditorTemplateHtml,
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
    dragula?: Dragula;
    @Input()
    md?: MarkdownIt;
    @Input()
    hljs?: typeof hljs;
    @Input()
    forceHttps?: boolean;

    collapsed?: boolean = false;
    value?: { [name: string]: common.ValueType };
    buttonGroupStyle = common.buttonGroupStyleString;
    errorMessage: string;
    filter = "";
    private properties: { property: string; schema: common.Schema }[] = [];
    private invalidProperties: string[] = [];
    ngOnInit() {
        this.collapsed = this.schema.collapsed;
        this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as { [name: string]: common.ValueType };
        this.validate();
        if (this.value !== undefined) {
            for (const property in this.schema.properties) {
                if (this.schema.properties.hasOwnProperty(property)) {
                    const schema = this.schema.properties[property];
                    const required = this.schema.required && this.schema.required.some(r => r === property);
                    this.value[property] = common.getDefaultValue(required, schema, this.value[property]) as { [name: string]: common.ValueType };

                    this.properties.push({
                        property,
                        schema,
                    });
                }
            }
            this.properties = this.properties.sort(common.compare);
        }
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    isRequired(property: string) {
        return this.schema.required && this.schema.required.some(r => r === property);
    }
    trackByFunction(index: number, p: { property: string; schema: common.Schema }) {
        return p.property;
    }
    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as { [name: string]: common.ValueType } | undefined;
        this.validate();
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onChange(property: string, { value, isValid }: common.ValidityValue<{ [name: string]: common.ValueType }>) {
        this.value![property] = value;
        this.validate();
        common.recordInvalidPropertiesOfObject(this.invalidProperties, isValid, property);
        this.updateValue.emit({ value: this.value, isValid: this.invalidProperties.length === 0 });
    }
    onFilterChange(e: { target: { value: string } }) {
        this.filter = e.target.value;
    }
    private validate() {
        this.errorMessage = common.getErrorMessageOfObject(this.value, this.schema, this.locale);
    }
    get filteredProperties() {
        return this.properties.filter(p => common.filterObject(p, this.filter));
    }
    get hasDeleteButtonFunction() {
        return this.hasDeleteButton && !this.isReadOnly;
    }
    get isReadOnly() {
        return this.readonly || this.schema.readonly;
    }
    get titleToShow() {
        if (this.hasDeleteButton) {
            return common.getTitle(common.findTitle(this.value, this.properties), this.title, this.schema.title);
        }
        return common.getTitle(this.title, this.schema.title);
    }
    get showFilter() {
        return this.properties.length >= common.minItemCountIfNeedFilter;
    }
}
