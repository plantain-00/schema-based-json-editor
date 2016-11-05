export declare const nullEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: null;
    };
    methods: {
        toggleOptional(this: This): void;
    };
};
export declare type This = {
    $emit: (event: string, ...args: any[]) => void;
    value?: null;
    schema: any;
    initialValue: null;
    required: boolean;
};
