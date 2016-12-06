import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";

import { Cancelable } from "lodash";
export type Cancelable = Cancelable;

export class NumberEditor extends React.Component<common.Props<common.NumberSchema, number>, {}> {
    value?: number;
    errorMessage: string;
    onChangeFunction = common.debounce((value: string) => {
        this.value = this.props.schema.type === "integer" ? common.toInteger(value) : common.toNumber(value);
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }, 500);
    constructor(props: common.Props<common.ArraySchema, number>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as number;
        this.validate();
    }
    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.onChangeFunction(e.currentTarget.value);
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

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <label className={this.props.theme.label}>
                    {this.titleToShow}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <Optional required={this.props.required}
                            value={this.value}
                            isReadOnly={this.isReadOnly}
                            theme={this.props.theme}
                            locale={this.props.locale}
                            toggleOptional={this.toggleOptional} />
                        <Icon valid={this.hasDeleteButtonFunction}
                            onClick={this.props.onDelete!}
                            text={this.props.icon.delete}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                    </div>
                </label>
                {input}
                {select}
                <Description theme={this.props.theme} message={this.props.schema.description} />
                <Description theme={this.props.theme} message={this.errorMessage} />
            </div>
        );
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
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
