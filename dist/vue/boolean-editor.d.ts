export declare const booleanEditor: {
    template: string;
    props: string[];
    data: () => {
        value: undefined;
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
