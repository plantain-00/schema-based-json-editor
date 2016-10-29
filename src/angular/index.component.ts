import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "json-editor",
    template: `
      <boolean-editor schema="{{schema}}" initialValue="{{initialValue}}" title="{{title}}"></boolean-editor>
    `,
})
export class JSONEditorComponent {
    @Input()
    schema: common.Schema;
    @Input()
    initialValue: common.ValueType;
    @Output()
    updateValue = new EventEmitter();
    @Input()
    theme?: string;
    @Input()
    icon?: string;
    @Input()
    locale?: string;
    @Input()
    readonly?: boolean;
    themeObject: common.Theme;
    localeObject: common.Locale;
    constructor() {
        this.themeObject = common.getTheme(this.theme);
        this.localeObject = common.getLocale(this.locale);
    }
}

import {BooleanEditorComponent} from "./boolean-editor.component";
export {BooleanEditorComponent};

import {ArrayEditorComponent} from "./array-editor.component";
export {ArrayEditorComponent};
