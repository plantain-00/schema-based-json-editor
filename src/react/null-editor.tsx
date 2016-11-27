import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";

export class NullEditor extends React.Component<common.Props<common.NullSchema, null>, {}> {
    value?: null;
    constructor(props: common.Props<common.ArraySchema, null>) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as null;
    }
    componentDidMount() {
        this.props.updateValue(this.value, true);
    }
    render() {
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
            <div className={this.props.theme.row}>
                {titleView}
                <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                    {optionalCheckbox}
                    {deleteButton}
                </div>
                <p className={this.props.theme.help}>{this.props.schema.description}</p>
            </div>
        );
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as null | undefined;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, true);
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
