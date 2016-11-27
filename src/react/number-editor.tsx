import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";

export class NumberEditor extends React.Component<common.Props<common.NumberSchema, number>, {}> {
    value?: number;
    errorMessage: string;
    constructor(props: common.Props<common.ArraySchema, number>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as number;
        this.validate();
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage);
    }
    render() {
        const input = this.useInput ? (
            <input className={this.props.theme.formControl}
                type="number"
                onChange={this.onChange}
                defaultValue={String(this.value)}
                readOnly={this.isReadOnly} />
        ) : null;

        const select = this.useSelect ? (
            <select className={this.props.theme.formControl}
                type="number"
                onChange={this.onChange}
                defaultValue={String(this.value)} >
                {this.props.schema.enum!.map((e, i) => <option key={i} value={e} >{e}</option>)}
            </select>
        ) : null;

        const errorDescription = this.errorMessage ? <p className={this.props.theme.help}>{this.errorMessage}</p> : null;

        const optionalCheckbox = this.hasOptionalCheckbox ? (
            <div className={this.props.theme.optionalCheckbox}>
                <label>
                    <input type="checkbox"
                        onChange={this.toggleOptional}
                        checked={this.value === undefined}
                        disabled={this.isReadOnly} />
                    {this.props.locale.info.notExists}
                </label>
            </div>
        ) : null;

        const deleteButton = this.props.onDelete ? (
            <button className={this.props.theme.button} onClick={this.props.onDelete}>
                <Icon icon={this.props.icon} text={this.props.icon.delete}></Icon>
            </button>
        ) : null;

        const titleView = this.props.title ? (
            <label className={this.props.theme.label}>
                {this.titleToShow}
            </label>
        ) : null;

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                {titleView}
                <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                    {optionalCheckbox}
                    {deleteButton}
                </div>
                {input}
                {select}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
                {errorDescription}
            </div>
        );
    }
    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = this.props.schema.type === "integer" ? common.toInteger(e.currentTarget.value) : common.toNumber(e.currentTarget.value);
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfNumber(this.value, this.props.schema, this.props.locale);
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as number | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    get useInput() {
        return this.value !== undefined && (this.props.schema.enum === undefined || this.isReadOnly);
    }
    get useSelect() {
        return this.value !== undefined && (this.props.schema.enum !== undefined && !this.isReadOnly);
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get hasOptionalCheckbox() {
        return !this.props.required && (this.value === undefined || !this.isReadOnly);
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
