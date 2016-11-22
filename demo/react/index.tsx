import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSONEditor } from "../../dist/react";
import { schema } from "../schema";

class Main extends React.Component<{}, {}> {
    value: any = {};
    isValid = false;
    locale = navigator.language ? navigator.language.toLowerCase() : undefined;
    updateValue = (value: any, isValid: boolean) => {
        this.value = value;
        this.isValid = isValid;
        this.setState({ value: this.value });
    }
    render() {
        return (
            <div>
                <div style={{ float: "left", margin: "10px", width: "400px", overflowY: "scroll", height: "600px" }}>
                    Schema:
                    <pre>{JSON.stringify(schema, null, "  ")}</pre>
                </div>
                <div style={{ width: "500px", margin: "10px", float: "left", overflowY: "scroll", height: "600px" }} className="bootstrap3-row-container">
                    GUI:
                    <JSONEditor schema={schema}
                        initialValue={this.value}
                        updateValue={this.updateValue}
                        theme="bootstrap3"
                        icon="fontawesome4"
                        locale={this.locale} />
                </div>
                <div style={{ float: "left", margin: "10px", width: "400px", overflowY: "scroll", height: "600px" }}>
                    Value:
                    <pre style={{ color: this.isValid ? "black" : "red" }}>{JSON.stringify(this.value, null, "  ")}</pre>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
