import * as common from "../common";
export declare const stringEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: string;
        errorMessage: undefined;
    };
    beforeMount(this: This): void;
    methods: {
        useTextArea(this: This): boolean;
        useInput(this: This): boolean;
        useSelect(this: This): boolean;
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
    $emit: (event: string, ...args: any[]) => void;
    validate: () => void;
    value?: string;
    errorMessage?: string;
    schema: any;
    initialValue: string;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
};
