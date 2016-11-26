/// <reference types="highlight.js" />
import * as common from "./common";
import { hljs } from "./lib";
export declare type This = {
    $emit: (event: string, args: common.ValidityValue<common.ValueType>) => void;
    locale: common.Locale;
    theme: common.Theme;
    icon: common.Icon;
    markdownit: any;
    hljs: typeof hljs;
    forceHttps: boolean;
};
