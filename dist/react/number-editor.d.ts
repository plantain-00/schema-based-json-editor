/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class NumberEditor extends React.Component<common.Props<common.NumberSchema, number>, {}> {
    private value?;
    private errorMessage;
    constructor(props: common.Props<common.ArraySchema, number>);
    componentDidMount(): void;
    render(): JSX.Element;
    private onChange;
    private validate();
    private toggleOptional;
}
