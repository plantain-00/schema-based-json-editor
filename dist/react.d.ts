/// <reference types="dragula" />
/// <reference types="highlight.js" />
/// <reference types="lodash" />
/// <reference types="react" />
import * as React from "react";
import * as common from "./common";
import { hljs, dragula } from "../typings/lib";
export declare type Props = {
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: (value: common.ValueType | undefined, isValid: boolean) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
    dragula?: typeof dragula;
    markdownit?: any;
    hljs?: typeof hljs;
    forceHttps?: boolean;
};
import { Cancelable } from "lodash";
export declare type Cancelable = Cancelable;
export declare class JSONEditor extends React.Component<Props, {}> {
    theme: common.Theme;
    locale: common.Locale;
    icon: common.Icon;
    md: any;
    updateValue: ((value: any, isValid: boolean) => void) & Cancelable;
    constructor(props: Props);
    render(): JSX.Element | null;
}
