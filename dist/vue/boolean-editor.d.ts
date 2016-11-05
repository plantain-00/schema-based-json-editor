export declare const booleanEditor: {
    template: string;
    props: string[];
    data: (this: any) => {
        value: boolean;
    };
    methods: {
        onChange(this: any, e: {
            target: {
                checked: boolean;
            };
        }): void;
        toggleOptional(this: any): void;
    };
};
