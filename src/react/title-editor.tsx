import * as React from "react";
import * as common from "../common";

export class TitleEditor extends React.Component<{ title?: string; onDelete?: () => void; theme: common.Theme; icon: common.Icon; locale: common.Locale }, {}> {
    render() {
        if (this.props.title) {
            let deleteButton: JSX.Element | null = null;
            if (this.props.onDelete) {
                deleteButton = <button className={this.props.theme.button} onClick={this.props.onDelete}>{this.props.icon.delete}</button>;
            }
            return (
                <label className={this.props.theme.label}>
                    {this.props.title}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        {deleteButton}
                    </div>
                </label>
            );
        } else {
            return null;
        }
    }
}
