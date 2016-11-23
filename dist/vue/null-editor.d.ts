import * as common from "../common";
export declare const nullEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: null;
        buttonGroupStyle: {
            marginLeft: string;
        };
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
};
