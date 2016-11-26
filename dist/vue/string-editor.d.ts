/// <reference types="highlight.js" />
import * as common from "../common";
import { hljs } from "../lib";
export declare const stringEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: string;
        errorMessage: undefined;
        buttonGroupStyle: string;
        collapsed: boolean;
        imagePreviewStyle: string;
    };
    beforeMount(this: This): void;
    methods: {
        useTextArea(this: This): boolean | undefined;
        useInput(this: This): boolean | undefined;
        useSelect(this: This): boolean;
        onChange(this: This, e: {
            target: {
                value: string;
            };
        }): void;
        validate(this: This): void;
        toggleOptional(this: This): void;
        collapseOrExpand(this: This): void;
        canPreviewImage(this: This): boolean;
        canPreviewMarkdown(this: This): boolean;
        canPreviewCode(this: This): boolean;
        canPreview(this: This): boolean | "" | undefined;
        getImageUrl(this: This): string | undefined;
        getMarkdown(this: This): any;
        getCode(this: This): string;
    };
};
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<common.ValueType | undefined>) => void;
    validate: () => void;
    value?: string;
    errorMessage?: string;
    schema: common.StringSchema;
    initialValue: string;
    locale: common.Locale;
    readonly: boolean;
    required: boolean;
    collapsed: boolean;
    md: any;
    hljs: typeof hljs;
    forceHttps: boolean;
    canPreviewImage: () => boolean;
    canPreviewMarkdown: () => boolean;
    canPreviewCode: () => boolean;
};
