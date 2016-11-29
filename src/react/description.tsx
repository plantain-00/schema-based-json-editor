import * as React from "react";
import * as common from "../common";

export class Description extends React.Component<{
    theme: common.Theme;
    message: string | undefined;
    notEmpty?: boolean;
}, {}> {
    render() {
        if (this.props.notEmpty || this.props.message) {
            return <p className={this.props.theme.help}>{this.props.message}</p>;
        }
        return null;
    }
}
