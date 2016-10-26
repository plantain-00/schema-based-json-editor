/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class StringEditor extends React.Component<common.Props<common.StringSchema, string>, {}> {
    value?: string;
    errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, string>);
    componentDidMount(): void;
    onChange: (e: React.FormEvent<{
        value: string;
    }>) => void;
    validate(): void;
    toggleOptional: () => void;
    render(): JSX.Element;
}
