/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class BooleanEditor extends React.Component<common.Props<common.BooleanSchema, boolean>, {}> {
    value?: boolean;
    constructor(props: common.Props<common.ArraySchema, boolean>);
    componentDidMount(): void;
    onChange: (e: React.FormEvent<{
        checked: boolean;
    }>) => void;
    toggleOptional: () => void;
    render(): JSX.Element;
}
