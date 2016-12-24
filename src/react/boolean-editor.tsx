import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";

export type Props = common.Props<common.BooleanSchema, boolean>;
export type State = Partial<{
    value?: boolean;
    locked: boolean;
    willRender: boolean;
}>;

export class BooleanEditor extends React.Component<Props, State> {
    value?: boolean;
    locked = true;
    willRender = false;
    constructor(props: Props) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as boolean;
    }
    componentDidMount() {
        this.props.updateValue(this.value, true);
    }
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (this.willRender) {
            this.willRender = false;
            return true;
        }
        return this.props.initialValue !== nextProps.initialValue || this.props.parentIsLocked !== nextProps.parentIsLocked;
    }
    render() {
        const control = this.value !== undefined ? (
            <div>
                <div className={this.props.theme.radiobox}>
                    <label>
                        <input type="radio"
                            onChange={this.onChange}
                            checked={this.value}
                            disabled={this.isReadOnly || this.isLocked} />
                        {this.props.locale.info.true}
                    </label>
                </div>
                <div className={this.props.theme.radiobox}>
                    <label>
                        <input type="radio"
                            onChange={this.onChange}
                            checked={!this.value}
                            disabled={this.isReadOnly || this.isLocked} />
                        {this.props.locale.info.false}
                    </label>
                </div>
            </div>
        ) : null;

        return (
            <div className={this.props.theme.row}>
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
                {control}
                <Description theme={this.props.theme} message={this.props.schema.description} />
            </div>
        );
    }
    onChange = (e: React.FormEvent<{ checked: boolean }>) => {
        this.value = !this.value;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, true);
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as boolean | undefined;
        this.setState({ value: this.value });
        this.props.updateValue(this.value, true);
    }
    toggleLocked = () => {
        this.locked = !this.locked;
        this.willRender = true;
        this.setState({ locked: this.locked });
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
