import * as common from "../common";
export declare const booleanEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: boolean;
        buttonGroupStyle: string;
    };
    computed: {
        isReadOnly(this: This): boolean | undefined;
        hasOptionalCheckbox(this: This): boolean;
        titleToShow(this: This): string;
    };
    methods: {
        onChange(this: This, e: {
            target: {
                checked: boolean;
            };
        }): void;
        toggleOptional(this: This): void;
    };
};
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<boolean | undefined>) => void;
    required: boolean;
    schema: common.BooleanSchema;
    initialValue: boolean;
    value?: boolean;
    readonly: boolean;
    isReadOnly: boolean;
    title: string;
};
