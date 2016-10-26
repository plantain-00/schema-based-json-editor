/// <reference types="react" />
/// <reference types="dragula" />
import * as React from "react";
import * as common from "../common";
export declare class ArrayEditor extends React.Component<common.Props<common.ArraySchema, common.ValueType[]>, {
    value?: common.ValueType[];
    collapsed?: boolean;
    renderSwitch?: number;
}> {
    renderSwitch: number;
    collapsed: boolean;
    value?: common.ValueType[];
    drak: common.dragula.Drake;
    constructor(props: common.Props<common.ArraySchema, common.ValueType[]>);
    getDragulaContainer(): Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    render(): JSX.Element;
}
