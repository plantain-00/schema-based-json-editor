import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import {Optional} from "./optional";
import { Description } from "./description";

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
        return (
            <div className={this.props.theme.row}>
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
                <Description theme={this.props.theme} message={this.props.schema.description} />
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
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
}
