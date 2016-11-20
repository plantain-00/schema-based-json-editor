/// <reference types="react" />
import * as React from "react";
import * as common from "./common";
export declare type Props = {
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: (value: common.ValueType | undefined, isValid: boolean) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
};
export declare class JSONEditor extends React.Component<Props, {}> {
    private theme;
    private locale;
    private icon;
    private updateValue;
    constructor(props: Props);
    render(): JSX.Element | null;
}
