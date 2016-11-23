/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class StringEditor extends React.Component<common.Props<common.StringSchema, string>, {}> {
    private value?;
    private errorMessage;
    private isImageUrl;
    private collapsed;
    constructor(props: common.Props<common.ArraySchema, string>);
    componentDidMount(): void;
    render(): JSX.Element;
    private onChange;
    private validate();
    private toggleOptional;
    private collapseOrExpand;
}
