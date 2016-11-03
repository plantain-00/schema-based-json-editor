/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class BooleanEditor extends React.Component<common.Props<common.BooleanSchema, boolean>, {}> {
    private value?;
    constructor(props: common.Props<common.ArraySchema, boolean>);
    componentDidMount(): void;
    render(): JSX.Element;
    private onChange;
    private toggleOptional;
}
