/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class NullEditor extends React.Component<common.Props<common.NullSchema, null>, {}> {
    private value?;
    constructor(props: common.Props<common.ArraySchema, null>);
    componentDidMount(): void;
    render(): JSX.Element;
    private toggleOptional;
}
