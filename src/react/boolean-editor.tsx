import * as React from "react";
import * as common from "../common";
import { TitleEditor } from "./title-editor";

export class BooleanEditor extends React.Component<common.Props<common.BooleanSchema, boolean>, {}> {
    value?: boolean;
    constructor(props: common.Props<common.ArraySchema, boolean>) {
        super(props);
        if (this.props.required) {
            this.value = common.getDefaultValue(this.props.schema, this.props.initialValue) as boolean;
        } else {
            this.value = undefined;
        }
    }
    componentDidMount() {
        if (this.value !== this.props.initialValue) {
            this.props.updateValue(this.value);
        }
    }
    onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.value = e.target.checked;
        this.props.updateValue(this.value);
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(this.props.schema, this.props.initialValue === undefined) as boolean;
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            control = (
                <div className={this.props.theme.optionalCheckbox}>
                    <label>
                        <input type="checkbox"
                            onChange={this.onChange}
                            checked={this.value}
                            readOnly={this.props.readonly || this.props.schema.readonly} />
                        {this.props.title}
                    </label>
                </div>
            );
        }
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
            <div className={this.props.theme.row}>
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                {control}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
}
