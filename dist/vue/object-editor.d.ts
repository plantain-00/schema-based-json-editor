import * as common from "../common";
export declare const objectEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        collapsed: boolean;
        value: {
            [name: string]: common.ValueType;
        };
        buttonGroupStyle: string;
        invalidProperties: never[];
    };
    computed: {
        isReadOnly(this: This): boolean | undefined;
        hasDeleteButtonFunction(this: This): boolean;
        hasOptionalCheckbox(this: This): boolean;
        titleToShow(this: This): string;
    };
    methods: {
        isRequired(this: This, property: string): boolean | undefined;
        collapseOrExpand(this: This): void;
        toggleOptional(this: This): void;
        onChange(this: This, property: string, {value, isValid}: {
            value: common.ValueType;
            isValid: boolean;
        }): void;
    };
};
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<{
        [name: string]: common.ValueType;
    } | undefined>) => void;
    value?: {
        [name: string]: common.ValueType;
    };
    collapsed: boolean;
    schema: common.ObjectSchema;
    initialValue: any;
    required: boolean;
    invalidProperties: string[];
    readonly: boolean;
    isReadOnly: boolean;
    hasDeleteButton: boolean;
    title: string;
};
