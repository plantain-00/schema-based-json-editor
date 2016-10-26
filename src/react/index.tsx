import * as React from "react";

import * as common from "../common";
import { ObjectEditor } from "./object-editor";
import { ArrayEditor } from "./array-editor";
import { NumberEditor } from "./number-editor";
import { BooleanEditor } from "./boolean-editor";
import { NullEditor } from "./null-editor";
import { StringEditor } from "./string-editor";

export const icons: { [name: string]: common.Icon } = {
    "bootstrap3": {
        collapse: <i className="glyphicon glyphicon-chevron-down"></i> as string | JSX.Element,
        expand: <i className="glyphicon glyphicon-chevron-right"></i> as string | JSX.Element,
        add: <i className="glyphicon glyphicon-plus"></i> as string | JSX.Element,
        delete: <i className="glyphicon glyphicon-remove"></i> as string | JSX.Element,
    },
    "fontawesome4": {
        collapse: <i className="fa fa-caret-square-o-down"></i> as string | JSX.Element,
        expand: <i className="fa fa-caret-square-o-right"></i> as string | JSX.Element,
        add: <i className="fa fa-plus"></i> as string | JSX.Element,
        delete: <i className="fa fa-times"></i> as string | JSX.Element,
    },
};

function getIcon(name: string | undefined | common.Icon, locale: common.Locale): common.Icon {
    if (name === undefined) {
        return {
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    if (typeof name === "string") {
        return icons[name] || {
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    return name;
}

export class JSONEditor extends React.Component<{
    schema: common.Schema;
    initialValue: common.ValueType;
    updateValue: (value?: common.ValueType) => void;
    theme?: string;
    icon?: string;
    locale?: string;
    readonly?: boolean;
}, {}> {
    render() {
        const theme = common.getTheme(this.props.theme);
        const locale = common.getLocale(this.props.locale);
        const icon = getIcon(this.props.icon, locale);
        const props = {
            updateValue: this.props.updateValue,
            readonly: this.props.readonly,
            theme,
            locale,
            icon,
            required: true,
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
