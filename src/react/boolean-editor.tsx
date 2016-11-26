import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";

export class BooleanEditor extends React.Component<common.Props<common.BooleanSchema, boolean>, {}> {
    private value?: boolean;
    constructor(props: common.Props<common.ArraySchema, boolean>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as boolean;
    }
    componentDidMount() {
        this.props.updateValue(this.value, true);
    }
    render() {
        let control: JSX.Element | null = null;
        if (this.value !== undefined) {
            control = (
                <div>
                    <div className={this.props.theme.radiobox}>
                        <label>
                            <input type="radio"
                                onChange={this.onChange}
                                checked={this.value}
                                disabled={this.props.readonly || this.props.schema.readonly} />
                            true
                        </label>
                    </div>
                    <div className={this.props.theme.radiobox}>
                        <label>
                            <input type="radio"
                                onChange={this.onChange}
                                checked={!this.value}
                                disabled={this.props.readonly || this.props.schema.readonly} />
                            false
                        </label>
                    </div>
                </div>
            );
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
            <div className={this.props.theme.row}>
                {titleView}
                <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                    {optionalCheckbox}
                    {deleteButton}
                </div>
                {control}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
    private onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.value = !this.value;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, true);
    }
    private toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as boolean | undefined;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, true);
    }
}
