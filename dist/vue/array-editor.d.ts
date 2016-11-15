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
        invalidIndexes: never[];
    };
    beforeDestroy(this: This): void;
    computed: {
        getValue(this: This): common.ValueType[];
    };
    mounted(this: This): void;
    methods: {
        collapseOrExpand(this: This): void;
        toggleOptional(this: This): void;
        validate(this: This): void;
        addItem(this: This): void;
        onDeleteFunction(this: This, i: number): void;
        onChange(this: This, i: number, {value, isValid}: {
            value: common.ValueType;
            isValid: boolean;
        }): void;
    };
};
export declare type This = {
    drak: common.dragula.Drake;
    $emit: (event: string, args: common.ValidityValue<common.ValueType[] | undefined>) => void;
    required: boolean;
    schema: common.ArraySchema;
    initialValue: common.ValueType[];
    value?: common.ValueType[];
    collapsed: boolean;
    errorMessage?: string;
    locale: common.Locale;
    renderSwitch: number;
    validate: () => void;
    $el: HTMLElement;
    invalidIndexes: number[];
};
