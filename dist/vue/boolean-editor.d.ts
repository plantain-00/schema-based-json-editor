export declare const booleanEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: boolean;
    };
    methods: {
        onChange(this: This, e: {
            target: {
                checked: boolean;
            };
        }): void;
        toggleOptional(this: This): void;
    };
};
export declare type This = {
    $emit: (event: string, ...args: any[]) => void;
    required: boolean;
    schema: any;
    initialValue: boolean;
    value?: boolean;
};
