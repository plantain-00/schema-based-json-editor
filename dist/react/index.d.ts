/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare const icons: {
    [name: string]: common.Icon;
};
export declare class JSONEditor extends React.Component<{
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: (value?: common.ValueType) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
}, {}> {
    render(): JSX.Element | null;
}
