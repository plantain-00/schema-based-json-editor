import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";

export class NullEditor extends React.Component<common.Props<common.NullSchema, null>, {}> {
    private value?: null;
    constructor(props: common.Props<common.ArraySchema, null>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as null;
    }
    componentDidMount() {
        this.props.updateValue(this.value, true);
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
                    {deleteButton}
                </div>
                {optionalCheckbox}
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
    private toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as null | undefined;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, true);
    }
}
