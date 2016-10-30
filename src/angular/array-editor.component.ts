import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as common from "../common";
// import { Editor } from "./editor";

@Component({
    selector: "array-editor",
    template: "",
})
export class ArrayEditorComponent {
    @Input()
    schema: common.ArraySchema;
    @Input()
    initialValue: common.ValueType[];
    @Input()
    title?: string;
    @Output()
    updateValue = new EventEmitter();
    @Input()
    theme: string;
    @Input()
    icon: string;
    @Input()
    locale: string;
    onDelete = new EventEmitter();
    @Input()
    readonly?: boolean;
    @Input()
    required?: boolean;

    renderSwitch = 1;
    collapsed = false;
    value?: common.ValueType[];
    drak: common.dragula.Drake;

    constructor() {
        if (this.required) {
            this.value = common.getDefaultValue(this.schema, this.initialValue) as common.ValueType[];
        } else {
            this.value = undefined;
        }

        if (this.value !== this.initialValue) {
            this.updateValue.emit(this.value);
        }
        // const container = this.getDragulaContainer();
        // this.drak = common.dragula([container]);
        // this.drak.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
        //     if (this.value) {
        //         const fromIndex = +el.dataset["index"];
        //         if (sibling) {
        //             const toIndex = +sibling.dataset["index"];
        //             this.value.splice(toIndex, 0, this.value[fromIndex]);
        //             if (fromIndex > toIndex) {
        //                 this.value.splice(fromIndex + 1, 1);
        //             } else {
        //                 this.value.splice(fromIndex, 1);
        //             }
        //         } else {
        //             this.value.push(this.value[fromIndex]);
        //             this.value.splice(fromIndex, 1);
        //         }
        //         this.renderSwitch = -this.renderSwitch;
        //         this.setState({ value: this.value, renderSwitch: this.renderSwitch });
        //         this.props.updateValue(this.value);
        //     }
        // });
    }

    getDragulaContainer() {
        // return ReactDOM.findDOMNode(this).childNodes[this.props.required ? 2 : 3] as Element;
    }

    ngOnDestroy() {
        if (this.drak) {
            this.drak.destroy();
        }
    }

    collapseOrExpand = () => {
        this.collapsed = !this.collapsed;
        // const container = this.getDragulaContainer();
        // this.drak.containers = [container];
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(this.schema, this.initialValue) as common.ValueType[];
        } else {
            this.value = undefined;
        }
        // const container = this.getDragulaContainer();
        // this.drak.containers = [container];
        this.updateValue.emit(this.value);
    }
}
