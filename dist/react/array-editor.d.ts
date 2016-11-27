/// <reference types="react" />
/// <reference types="dragula" />
import * as React from "react";
import * as common from "../common";
import { dragula } from "../../typings/lib";
export declare class ArrayEditor extends React.Component<common.Props<common.ArraySchema, common.ValueType[]>, {
    value?: common.ValueType[];
    collapsed?: boolean;
    renderSwitch?: number;
}> {
    renderSwitch: number;
    collapsed: boolean;
    value?: common.ValueType[];
    drak?: dragula.Drake;
    errorMessage: string;
    invalidIndexes: number[];
    constructor(props: common.Props<common.ArraySchema, common.ValueType[]>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    validate(): void;
    addItem: () => void;
    onChange: (i: number, value: common.ValueType, isValid: boolean) => void;
    onDeleteFunction: (i: number) => void;
    readonly isReadOnly: boolean | undefined;
    readonly hasOptionalCheckbox: boolean;
    readonly hasDeleteButton: boolean | undefined;
    readonly hasAddButton: boolean;
    readonly getValue: common.ValueType[];
    readonly titleToShow: string;
}
