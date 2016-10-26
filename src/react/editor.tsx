import * as React from "react";
import * as common from "../common";
import { ObjectEditor } from "./object-editor";
import { ArrayEditor } from "./array-editor";
import { NumberEditor } from "./number-editor";
import { BooleanEditor } from "./boolean-editor";
import { NullEditor } from "./null-editor";
import { StringEditor } from "./string-editor";

export class Editor extends React.Component<common.Props<common.Schema, common.ValueType>, {}> {
    render() {
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor {...this.props as common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>} />;
            case "array":
                return <ArrayEditor {...this.props as common.Props<common.ArraySchema, common.ValueType[]>} />;
            case "number":
            case "integer":
                return <NumberEditor  {...this.props as common.Props<common.NumberSchema, number>} />;
            case "boolean":
                return <BooleanEditor  {...this.props as common.Props<common.BooleanSchema, boolean>} />;
            case "null":
                return <NullEditor  {...this.props as common.Props<common.NullSchema, null>} />;
            case "string":
                return <StringEditor {...this.props as common.Props<common.StringSchema, string>} />;
            default:
                return null;
        }
    }
}
