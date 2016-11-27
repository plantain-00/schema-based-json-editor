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
    invalidProperties: string[];
    constructor(props: common.Props<common.ObjectSchema, {
        [name: string]: common.ValueType;
    }>);
    componentDidMount(): void;
    render(): JSX.Element;
    collapseOrExpand: () => void;
    toggleOptional: () => void;
    onChange: (property: string, value: common.ValueType, isValid: boolean) => void;
    isRequired(property: string): boolean | undefined;
    readonly hasDeleteButtonFunction: boolean | undefined;
    readonly isReadOnly: boolean | undefined;
    readonly hasOptionalCheckbox: boolean;
    readonly titleToShow: string;
}
