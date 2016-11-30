import * as React from "react";

import * as common from "./common";
import { Editor } from "./react/editor";
import { hljs, dragula, MarkdownIt } from "../typings/lib";

export type Props = {
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: (value: common.ValueType | undefined, isValid: boolean) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
    dragula?: typeof dragula;
    markdownit?: any;
    hljs?: typeof hljs;
    forceHttps?: boolean;
};

import { Cancelable } from "lodash";
export type Cancelable = Cancelable;

export class JSONEditor extends React.Component<Props, {}> {
    theme: common.Theme;
    locale: common.Locale;
    icon: common.Icon;
    md?: MarkdownIt.MarkdownIt;
    updateValue = common.debounce((value: any, isValid: boolean) => {
        this.props.updateValue(value, isValid);
    }, 100);
    constructor(props: Props) {
        super(props);
        this.theme = common.getTheme(this.props.theme);
        this.locale = common.getLocale(this.props.locale);
        this.icon = common.getIcon(this.props.icon, this.locale);
        this.md = common.initializeMarkdown(this.props.markdownit, this.props.hljs, this.props.forceHttps);
    }
    render() {
        return <Editor schema={this.props.schema}
            initialValue={this.props.initialValue}
            updateValue={this.updateValue}
            readonly={this.props.readonly}
            theme={this.theme}
            locale={this.locale}
            icon={this.icon}
            required={true}
            dragula={this.props.dragula}
            md={this.md}
            hljs={this.props.hljs}
            forceHttps={this.props.forceHttps} />;
    }
}
