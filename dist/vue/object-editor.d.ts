import * as common from "../common";
export declare const objectEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        collapsed: boolean;
        value: {
            [name: string]: common.ValueType;
        };
        buttonGroupStyle: {
            marginLeft: string;
        };
    };
    methods: {
        isRequired(this: This, property: string): any;
        collapseOrExpand(this: This): void;
        toggleOptional(this: This): void;
        onChange(this: This, property: string, value: common.ValueType): void;
    };
};
export declare type This = {
    $emit: (event: string, ...args: any[]) => void;
    value?: {
        [name: string]: common.ValueType;
    };
    collapsed: boolean;
    schema: any;
    initialValue: any;
    required: boolean;
};
