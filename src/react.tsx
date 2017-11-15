import * as React from "react";
import * as common from "./common";
export * from "./common";
import { Editor } from "./react/editor";
import { Dragula, MarkdownItType, MarkdownIt, HLJS } from "./libs";

/**
 * @public
 */
export type Props = {
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: (value: common.ValueType | undefined, isValid: boolean) => void;
    theme?: string;
    icon?: string;
    locale?: common.Locale | null;
    readonly?: boolean;
    dragula?: Dragula;
    markdownit?: MarkdownItType;
    hljs?: HLJS;
    forceHttps?: boolean;
};

/**
 * @public
 */
export class JSONEditor extends React.Component<Props, {}> {
    private theme: common.Theme;
    private locale: common.Locale;
    private icon: common.Icon;
    private md?: MarkdownIt;
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
    private updateValue = (value: any, isValid: boolean) => {
        this.props.updateValue(value, isValid);
    }
}
