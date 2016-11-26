import * as React from "react";

import * as common from "./common";
import { ObjectEditor } from "./react/object-editor";
import { ArrayEditor } from "./react/array-editor";
import { NumberEditor } from "./react/number-editor";
import { BooleanEditor } from "./react/boolean-editor";
import { NullEditor } from "./react/null-editor";
import { StringEditor } from "./react/string-editor";
import { hljs, dragula } from "./lib";

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

export class JSONEditor extends React.Component<Props, {}> {
    private theme: common.Theme;
    private locale: common.Locale;
    private icon: common.Icon;
    private updateValue = common.debounce((value: any, isValid: boolean) => {
        this.props.updateValue(value, isValid);
    }, 100);
    private md: any;
    constructor(props: Props) {
        super(props);
        this.theme = common.getTheme(this.props.theme);
        this.locale = common.getLocale(this.props.locale);
        this.icon = common.getIcon(this.props.icon, this.locale);
        this.md = common.initializeMarkdown(this.props.markdownit, this.props.hljs, this.props.forceHttps);
    }
    render() {
        const props = {
            updateValue: this.updateValue,
            readonly: this.props.readonly,
            theme: this.theme,
            locale: this.locale,
            icon: this.icon,
            required: true,
            dragula: this.props.dragula,
            md: this.md,
            hljs: this.props.hljs,
            forceHttps: this.props.forceHttps,
        };

        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as { [name: string]: common.ValueType }}
                    {...props} />;
            case "array":
                return <ArrayEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as common.ValueType[]}
                    {...props} />;
            case "number":
            case "integer":
                return <NumberEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as number}
                    {...props} />;
            case "boolean":
                return <BooleanEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as boolean}
                    {...props} />;
            case "null":
                return <NullEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as null}
                    {...props} />;
            case "string":
                return <StringEditor schema={this.props.schema}
                    initialValue={this.props.initialValue as string}
                    {...props} />;
            default:
                return null;
        }
    }
}
