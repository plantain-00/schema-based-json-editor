import * as React from "react";
import * as common from "../common";
import { TitleEditor } from "./title-editor";

export class NumberEditor extends React.Component<common.Props<common.NumberSchema, number>, {}> {
    private value?: number;
    private errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, number>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as number;
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value);
    }
    render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            if (this.props.schema.enum === undefined || this.props.readonly || this.props.schema.readonly) {
                control = (
                    <input className={this.props.theme.formControl}
                        type="number"
                        onChange={this.onChange}
                        defaultValue={String(this.value)}
                        readOnly={this.props.readonly || this.props.schema.readonly} />
                );
            } else {
                const options = this.props.schema.enum.map((e, i) => <option key={i} value={e} >{e}</option>);
                control = (
                    <select className={this.props.theme.formControl}
                        type="number"
                        onChange={this.onChange}
                        defaultValue={String(this.value)} >
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
    private onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = this.props.schema.type === "integer" ? common.toInteger(e.currentTarget.value) : common.toNumber(e.currentTarget.value);
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
    private validate() {
        if (this.value !== undefined) {
            if (this.props.schema.minimum !== undefined) {
                if (this.props.schema.exclusiveMinimum) {
                    if (this.value <= this.props.schema.minimum) {
                        this.errorMessage = this.props.locale.error.largerThan.replace("{0}", String(this.props.schema.minimum));
                        return;
                    }
                } else {
                    if (this.value < this.props.schema.minimum) {
                        this.errorMessage = this.props.locale.error.minimum.replace("{0}", String(this.props.schema.minimum));
                        return;
                    }
                }
            }
            if (this.props.schema.maximum !== undefined) {
                if (this.props.schema.exclusiveMaximum) {
                    if (this.value >= this.props.schema.maximum) {
                        this.errorMessage = this.props.locale.error.smallerThan.replace("{0}", String(this.props.schema.maximum));
                        return;
                    }
                } else {
                    if (this.value > this.props.schema.maximum) {
                        this.errorMessage = this.props.locale.error.maximum.replace("{0}", String(this.props.schema.maximum));
                        return;
                    }
                }
            }
        }

        this.errorMessage = "";
    }
    private toggleOptional = () => {
        if (this.value === undefined) {
            this.value = common.getDefaultValue(true, this.props.schema, this.props.initialValue) as number;
            this.validate();
        } else {
            this.value = undefined;
        }
        this.setState({ value: this.value });
        this.props.updateValue(this.value);
    }
}
