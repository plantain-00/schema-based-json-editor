/// <reference types="react" />
import * as React from "react";
import * as common from "../common";
export declare class TitleEditor extends React.Component<{
    title: string | undefined;
    onDelete?: () => void;
    theme: common.Theme;
    icon: common.Icon;
    locale: common.Locale;
}, {}> {
    render(): JSX.Element | null;
}
