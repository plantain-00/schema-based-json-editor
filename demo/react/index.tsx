import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSONEditor } from "../../dist/react";
import { schema } from "../schema";
declare const require: any;
import * as dragula from "dragula";
const markdownit = require("markdown-it");
import * as hljs from "highlight.js";

class Main extends React.Component<{}, {}> {
    value: any = {};
    isValid = false;
    locale = navigator.language;
    schemaHtml = hljs.highlight("json", JSON.stringify(schema, null, "  ")).value;
    updateValue = (value: any, isValid: boolean) => {
        this.value = value;
        this.isValid = isValid;
        this.setState({ value: this.value });
    }
    render() {
        const valueHtml = hljs.highlight("json", JSON.stringify(this.value, null, "  ")).value;
        return (
            <div>
                <div style={{ float: "left", margin: "10px", width: "400px", overflowY: "scroll", height: "600px" }}>
                    Schema:
                    <pre><code dangerouslySetInnerHTML={{ __html: this.schemaHtml }}></code></pre>
                </div>
                <div style={{ width: "500px", margin: "10px", float: "left", overflowY: "scroll", height: "600px" }} className="bootstrap3-row-container">
                    GUI:
                    <JSONEditor schema={schema}
                        initialValue={this.value}
                        updateValue={this.updateValue}
                        theme="bootstrap3"
                        icon="fontawesome4"
                        locale={this.locale}
                        dragula={dragula}
                        markdownit={markdownit}
                        hljs={hljs}
                        forceHttps={false} />
                </div>
                <div style={{ float: "left", margin: "10px", width: "400px", overflowY: "scroll", height: "600px" }}>
                    Value:
                    <pre style={{ borderColor: this.isValid ? "black" : "red" }}><code dangerouslySetInnerHTML={{ __html: valueHtml }}></code></pre>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
