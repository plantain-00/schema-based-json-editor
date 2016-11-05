export declare const stringEditor: {
    template: string;
    props: string[];
    data: (this: any) => {
        value: string;
        errorMessage: undefined;
    };
    methods: {
        useTextArea(this: any): boolean;
        useInput(this: any): boolean;
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
