import * as React from "react";
import * as common from "../common";

export class Icon extends React.Component<{ icon: common.Icon, text: string }, {}> {
    render() {
        if (this.props.icon.isText) {
            return <span>{this.props.text}</span>;
        } else {
            return <i className={this.props.text}></i>;
        }
    }
}
