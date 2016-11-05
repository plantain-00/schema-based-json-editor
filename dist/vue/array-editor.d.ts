/// <reference types="dragula" />
import * as common from "../common";
export declare const arrayEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        renderSwitch: number;
        collapsed: boolean;
        value: common.ValueType[];
        drak: undefined;
        errorMessage: undefined;
        buttonGroupStyleString: string;
    };
    beforeDestroy(this: This): void;
    mounted(this: This): void;
    methods: {
        getDragulaContainer(this: This): HTMLElement;
        collapseOrExpand(this: This): void;
        toggleOptional(this: This): void;
        validate(this: This): void;
        addItem(this: This): void;
        onDeleteFunction(this: This, i: number): void;
        onChange(this: This, i: number, value: common.ValueType): void;
    };
};
export declare type This = {
    drak: common.dragula.Drake;
    $emit: (event: string, ...args: any[]) => void;
    required: boolean;
    schema: any;
    initialValue: common.ValueType[];
    value?: common.ValueType[];
    collapsed: boolean;
    errorMessage?: string;
    locale: common.Locale;
    renderSwitch: number;
    validate: () => void;
    $el: HTMLElement;
    getDragulaContainer: () => HTMLElement;
};
