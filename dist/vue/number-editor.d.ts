export declare const numberEditor: {
    template: string;
    props: string[];
    data: () => {
        value: undefined;
        errorMessage: undefined;
    };
    methods: {
        useInput(this: any): any;
        useSelect(this: any): boolean;
        onChange(this: any, e: {
            target: {
                value: string;
            };
        }): void;
        validate(this: any): void;
        toggleOptional(this: any): void;
    };
};
