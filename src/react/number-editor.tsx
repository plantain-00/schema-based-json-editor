import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";

export class NumberEditor extends React.Component<common.Props<common.NumberSchema, number>, {}> {
    private value?: number;
    private errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, number>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as number;
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage);
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
        if (!this.props.required && (this.value === undefined || !this.props.schema.readonly)) {
            optionalCheckbox = (
                <div className={this.props.theme.optionalCheckbox}>
                    <label>
                        <input type="checkbox"
                            onChange={this.toggleOptional}
                            checked={this.value === undefined}
                            disabled={this.props.readonly || this.props.schema.readonly} />
                        is undefined
                    </label>
                </div>
            );
        }
        let deleteButton: JSX.Element | null = null;
        if (this.props.onDelete) {
            deleteButton = (
                <button className={this.props.theme.button} onClick={this.props.onDelete}>
                    <Icon icon={this.props.icon} text={this.props.icon.delete}></Icon>
                </button>
            );
        }
        let titleView: JSX.Element | null = null;
        if (this.props.title) {
            titleView = (
                <label className={this.props.theme.label}>
                    {this.props.title}
                </label>
            );
        }
        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                {titleView}
                <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                    {optionalCheckbox}
                    {deleteButton}
                </div>
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
        this.props.updateValue(this.value, !this.errorMessage);
    }
    private validate() {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.props.schema, this.props.locale);
    }
    private toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as number | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
}
