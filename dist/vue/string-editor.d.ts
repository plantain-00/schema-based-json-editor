import * as common from "../common";
export declare const stringEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: string;
        errorMessage: undefined;
        isImageUrl: boolean;
        buttonGroupStyle: {
            marginLeft: string;
        };
        collapsed: boolean;
    };
    beforeMount(this: This): void;
    methods: {
        useTextArea(this: This): boolean | undefined;
        useInput(this: This): boolean | undefined;
        useSelect(this: This): boolean;
        onChange(this: This, e: {
            target: {
                value: string;
            };
        }): void;
        validate(this: This): void;
        toggleOptional(this: This): void;
        collapseOrExpand(this: This): void;
    };
};
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<common.ValueType | undefined>) => void;
    validate: () => void;
    value?: string;
    errorMessage?: string;
    schema: common.StringSchema;
    initialValue: string;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    isImageUrl: boolean;
    collapsed: boolean;
};
