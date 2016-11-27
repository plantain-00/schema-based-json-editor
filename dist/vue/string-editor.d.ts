/// <reference types="highlight.js" />
import * as common from "../common";
import { hljs } from "../../typings/lib";
export declare const stringEditor: {
    template: string;
    props: string[];
    data: (this: This) => {
        value: string;
        errorMessage: undefined;
        buttonGroupStyle: string;
        collapsed: boolean;
        imagePreviewStyle: string;
        locked: boolean;
    };
    beforeMount(this: This): void;
    computed: {
        canPreviewImage(this: This): boolean;
        canPreviewMarkdown(this: This): boolean;
        canPreviewCode(this: This): boolean;
        canPreview(this: This): boolean | "" | undefined;
        useTextArea(this: This): boolean;
        useInput(this: This): boolean;
        useSelect(this: This): boolean;
        hasLockButton(this: This): boolean;
        getImageUrl(this: This): string | undefined;
        getMarkdown(this: This): any;
        getCode(this: This): string;
        isReadOnly(this: This): boolean | undefined;
        hasOptionalCheckbox(this: This): boolean;
        willPreviewImage(this: This): boolean | "" | undefined;
        willPreviewMarkdown(this: This): boolean | "" | undefined;
        willPreviewCode(this: This): boolean | "" | undefined;
        titleToShow(this: This): string;
    };
    methods: {
        onChange(this: This, e: {
            target: {
                value: string;
            };
        }): void;
        validate(this: This): void;
        toggleOptional(this: This): void;
        collapseOrExpand(this: This): void;
        toggleLocked(this: This): void;
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
    canPreviewImage: boolean;
    canPreviewMarkdown: boolean;
    canPreviewCode: boolean;
    isReadOnly: boolean;
    locked: boolean;
    title: string;
};
