import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";

@Component({
    selector: "title-editor",
    template: `
    <label *ngIf="title" className={this.props.theme.label}>
        {this.props.title}
        <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
            <button *ngIf="onDelete" className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>
        </div>
    </label>
    `,
})
export class TitleEditorComponent {
    @Input()
    title?: string;
    @Output()
    onDelete?= new EventEmitter();
    @Input()
    theme: common.Theme;
    @Input()
    icon: common.Icon;
    @Input()
    locale: common.Locale;
}
