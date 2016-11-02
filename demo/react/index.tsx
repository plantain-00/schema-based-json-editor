import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSONEditor } from "../../dist/react/index";
import { schema } from "../schema";

class Main extends React.Component<{}, {}> {
    value: any = {};
    updateValue(value: any) {
        this.value = value;
        this.setState({ value: this.value });
    }
    render() {
        return (
            <div>
                <div style={{ width: "500px", margin: "10px", float: "left" }} className="bootstrap3-row-container">
                    <JSONEditor schema={schema}
                        initialValue={this.value}
                        updateValue={value => this.updateValue(value)}
                        theme="bootstrap3"
                        icon="fontawesome4"
                        locale="zh-cn" />
                </div>
                <pre style={{ float: "left", margin: "10px", width: "400px" }}>
                    {JSON.stringify(schema, null, "  ")}
                </pre>
                <pre style={{ float: "left", margin: "10px", width: "400px" }}>
                    {JSON.stringify(this.value, null, "  ")}
                </pre>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
