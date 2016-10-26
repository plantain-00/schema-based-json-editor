/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class NumberEditor extends React.Component<common.Props<common.NumberSchema, number>, {}> {
    value?: number;
    errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, number>);
    componentDidMount(): void;
    onChange: (e: React.FormEvent<{
        value: string;
    }>) => void;
    validate(): void;
    toggleOptional: () => void;
    render(): JSX.Element;
}
