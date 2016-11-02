import * as React from "react";
import * as common from "../common";
import { TitleEditor } from "./title-editor";

export class StringEditor extends React.Component<common.Props<common.StringSchema, string>, {}> {
    value?: string;
    errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, string>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as string;
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value);
    }
    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = e.currentTarget.value;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    validate() {
        if (this.value !== undefined) {
            if (this.props.schema.minLength !== undefined
                && this.value.length < this.props.schema.minLength) {
                this.errorMessage = this.props.locale.error.minLength.replace("{0}", String(this.props.schema.minLength));
                return;
            }
            if (this.props.schema.maxLength !== undefined
                && this.value.length > this.props.schema.maxLength) {
                this.errorMessage = this.props.locale.error.maxLength.replace("{0}", String(this.props.schema.maxLength));
                return;
            }
            if (this.props.schema.pattern !== undefined
                && !new RegExp(this.props.schema.pattern).test(this.value)) {
                this.errorMessage = this.props.locale.error.pattern.replace("{0}", String(this.props.schema.pattern));
                return;
            }
        }

        this.errorMessage = "";
    }
    toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.props.schema, this.props.initialValue) as string;
            this.validate();
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                if (this.props.schema.format === "textarea") {
                    control = (
                        <textarea className={this.props.theme.formControl}
                            onChange={this.onChange}
                            defaultValue={this.value}
                            rows={5}
                            readOnly={this.props.readonly || this.props.schema.readonly} >
                        </textarea>
                    );
                } else {
                    control = (
                        <input className={this.props.theme.formControl}
                            type={this.props.schema.format}
                            onChange={this.onChange}
                            defaultValue={this.value}
                            readOnly={this.props.readonly || this.props.schema.readonly} />
                    );
                }
            } else {
                const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
                control = (
                    <select className={this.props.theme.formControl}
                        onChange={this.onChange}
                        defaultValue={this.value}>
                        {options}
                    </select>
                );
            }
        }

        let errorDescription: JSX.Element | null = null;
        if (this.errorMessage) {
            errorDescription = <p className={this.props.theme.help}>{this.errorMessage}</p>;
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
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <TitleEditor {...this.props} />
                {optionalCheckbox}
                {control}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {errorDescription}
            </div>
        );
    }
}
