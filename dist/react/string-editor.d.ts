/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class StringEditor extends React.Component<common.Props<common.StringSchema, string>, {}> {
    value?: string;
    errorMessage: string;
    collapsed: boolean;
    locked: boolean;
    constructor(props: common.Props<common.ArraySchema, string>);
    componentDidMount(): void;
    render(): JSX.Element;
    readonly isReadOnly: boolean | undefined;
    readonly useTextArea: boolean | undefined;
    readonly useInput: boolean | undefined;
    readonly useSelect: boolean;
    readonly hasLockButton: boolean | undefined;
    readonly hasOptionalCheckbox: boolean;
    readonly canPreviewImage: boolean;
    readonly canPreviewMarkdown: boolean;
    readonly canPreviewCode: boolean | undefined;
    readonly canPreview: boolean | "" | undefined;
    readonly getImageUrl: string | undefined;
    readonly getMarkdown: any;
    readonly getCode: string;
    readonly willPreviewImage: boolean | "" | undefined;
    readonly willPreviewMarkdown: boolean | "" | undefined;
    readonly willPreviewCode: boolean | "" | undefined;
    readonly titleToShow: string;
    onChange: (e: React.FormEvent<{
        value: string;
    }>) => void;
    validate(): void;
    toggleOptional: () => void;
    collapseOrExpand: () => void;
    toggleLocked: () => void;
}
