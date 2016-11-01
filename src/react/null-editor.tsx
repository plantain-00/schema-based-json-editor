import * as React from "react";
import * as common from "../common";
import { TitleEditor } from "./title-editor";

export class NullEditor extends React.Component<common.Props<common.NullSchema, null>, {}> {
    value?: null;
    constructor(props: common.Props<common.ArraySchema, null>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as null;
    }
    componentDidMount() {
        this.props.updateValue(this.value);
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.props.schema, this.props.initialValue) as null;
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    render() {
        let optionalCheckbox: JSX.Element | null = null;
        if (!this.props.required) {
            optionalCheckbox = (
                <div className={this.props.theme.optionalCheckbox}>
                    <label>
                        <input type="checkbox" onChange={this.toggleOptional} checked={this.value === undefined} />
                        is undefined
                    </label>
                </div>
            );
        }
        return (
            <div>
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
}
