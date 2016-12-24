import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";

import { Cancelable } from "lodash";
export type Cancelable = Cancelable;

export type Props = common.Props<common.NumberSchema, number>;
export type State = Partial<{
    value?: number;
    errorMessage: string;
    locked: boolean;
    willRender: boolean;
}>;

export class NumberEditor extends React.Component<Props, State> {
    value?: number;
    errorMessage: string;
    locked = true;
    willRender = false;
    constructor(props: Props) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as number;
        this.validate();
    }
    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = this.props.schema.type === "integer" ? common.toInteger(e.currentTarget.value) : common.toNumber(e.currentTarget.value);
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage);
    }
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (this.willRender) {
            this.willRender = false;
            return true;
        }
        return this.props.initialValue !== nextProps.initialValue || this.props.parentIsLocked !== nextProps.parentIsLocked;
    }
    render() {
        const input = this.useInput ? (
            <input className={this.props.theme.formControl}
                type="number"
                onChange={this.onChange}
                defaultValue={String(this.value)}
                readOnly={this.isReadOnly || this.isLocked}
                disabled={this.isReadOnly || this.isLocked} />
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
                        <Icon valid={!this.isReadOnly}
                            onClick={this.toggleLocked}
                            text={this.locked ? this.props.icon.unlock : this.props.icon.lock}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                        <Optional required={this.props.required}
                            value={this.value}
                            isReadOnly={this.isReadOnly || this.isLocked}
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
    toggleLocked = () => {
        this.locked = !this.locked;
        this.willRender = true;
        this.setState({ locked: this.locked });
    }
    get useInput() {
        return this.value !== undefined && (this.props.schema.enum === undefined || this.isReadOnly || this.isLocked);
    }
    get useSelect() {
        return this.value !== undefined && (this.props.schema.enum !== undefined && !this.isReadOnly && !this.isLocked);
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get isLocked() {
        return this.props.parentIsLocked !== false && this.locked;
    }
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly && !this.isLocked;
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
