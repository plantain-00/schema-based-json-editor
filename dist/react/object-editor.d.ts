/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class ObjectEditor extends React.Component<common.Props<common.ObjectSchema, {
    [name: string]: common.ValueType;
}>, {
    collapsed?: boolean;
    value?: {
        [name: string]: common.ValueType;
    };
}> {
    collapsed: boolean;
    value?: {
        [name: string]: common.ValueType;
    };
    constructor(props: common.Props<common.ObjectSchema, {
        [name: string]: common.ValueType;
    }>);
    componentDidMount(): void;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    render(): JSX.Element;
}
