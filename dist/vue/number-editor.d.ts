import * as common from "../common";
export declare const numberEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: number;
        errorMessage: undefined;
        buttonGroupStyle: string;
    };
    computed: {
        useInput(this: This): boolean;
        useSelect(this: This): boolean;
        isReadOnly(this: This): boolean | undefined;
        hasOptionalCheckbox(this: This): boolean;
        titleToShow(this: This): string;
    };
    methods: {
        onChange(this: This, e: {
            target: {
                value: string;
            };
        }): void;
        validate(this: This): void;
        toggleOptional(this: This): void;
    };
};
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<number | undefined>) => void;
    value?: number;
    errorMessage?: string;
    schema: common.NumberSchema;
    initialValue: number;
    locale: common.Locale;
    validate: () => void;
    readonly: boolean;
    required: boolean;
    isReadOnly: boolean;
    title: string;
};
