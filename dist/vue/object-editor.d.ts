import * as common from "../common";
export declare const objectEditor: {
    template: string;
    props: string[];
    data: (this: any) => {
        collapsed: boolean;
        value: {
            [name: string]: common.ValueType;
        };
        buttonGroupStyle: {
            marginLeft: string;
        };
    };
    methods: {
        isRequired(this: any, property: string): any;
        collapseOrExpand(this: any): void;
        toggleOptional(this: any): void;
        onChange(this: any, property: string, value: common.ValueType): void;
    };
};
