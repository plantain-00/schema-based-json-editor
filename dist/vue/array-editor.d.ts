import * as common from "../common";
export declare const arrayEditor: {
    template: string;
    props: string[];
    data: () => {
        renderSwitch: number;
        collapsed: boolean;
        value: undefined;
        drak: undefined;
        errorMessage: undefined;
        buttonGroupStyleString: string;
    };
    methods: {
        getDragulaContainer(this: any): any;
        ngOnDestroy(this: any): void;
        collapseOrExpand(this: any): void;
        toggleOptional(this: any): void;
        validate(this: any): void;
        addItem(this: any): void;
        onDeleteFunction(this: any, i: number): void;
        onChange(this: any, i: number, value: common.ValueType): void;
    };
};
