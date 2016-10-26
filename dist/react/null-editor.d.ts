/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class NullEditor extends React.Component<common.Props<common.NullSchema, null>, {}> {
    value?: null;
    constructor(props: common.Props<common.ArraySchema, null>);
    componentDidMount(): void;
    toggleOptional: () => void;
    render(): JSX.Element;
}
