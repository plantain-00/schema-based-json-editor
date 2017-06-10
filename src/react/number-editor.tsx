import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";
import { Select2 } from "select2-component/dist/react";

export type Props = common.Props<common.NumberSchema, number>;
export type State = Partial<{
    value?: number;
    errorMessage: string;
    willRender: boolean;
}>;

export class NumberEditor extends React.Component<Props, State> {
    value?: number;
    errorMessage: string;
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
        return this.props.initialValue !== nextProps.initialValue;
    }
    render() {
        const input = this.useInput ? (
            <input className={this.props.theme.formControl}
                type="number"
                onChange={this.onChange}
                defaultValue={String(this.value)}
                readOnly={this.isReadOnly}
                disabled={this.isReadOnly} />
        ) : null;

        const select = this.useSelect ? (
            <Select2 data={this.options}
                value={this.value}
                update={(e: number) => this.updateSelection(e)}>
            </Select2>
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
    get options() {
        return this.props.schema.enum!.map(e => ({
            value: e,
            label: e.toString(),
        }));
    }

    updateSelection(value: number) {
        this.value = value;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
}
