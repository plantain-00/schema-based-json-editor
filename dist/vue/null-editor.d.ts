import * as common from "../common";
export declare const nullEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: null;
        buttonGroupStyle: string;
    };
    computed: {
        isReadOnly(this: This): boolean | undefined;
        hasOptionalCheckbox(this: This): boolean;
        titleToShow(this: This): string;
    };
    methods: {
        toggleOptional(this: This): void;
    };
};
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<null | undefined>) => void;
    value?: null;
    schema: common.NullSchema;
    initialValue: null;
    required: boolean;
    readonly: boolean;
    isReadOnly: boolean;
    title: string;
};
