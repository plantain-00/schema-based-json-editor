/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class ArrayEditor extends React.Component<common.Props<common.ArraySchema, common.ValueType[]>, {
    value?: common.ValueType[];
    collapsed?: boolean;
    renderSwitch?: number;
}> {
    private renderSwitch;
    private collapsed;
    private value?;
    private drak;
    private errorMessage;
    private invalidIndexes;
    constructor(props: common.Props<common.ArraySchema, common.ValueType[]>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private collapseOrExpand;
    private toggleOptional;
    private validate();
}
