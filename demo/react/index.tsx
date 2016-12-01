import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSONEditor } from "../../dist/react";
import { schema, schemaSchema } from "../schema";
import * as dragula from "dragula";
import * as MarkdownIt from "markdown-it";
import * as hljs from "highlight.js";

class Main extends React.Component<{}, {}> {
    schema = schema;
    value: any = {};
    isValid = false;
    locale = navigator.language;
    schemaSchema = schemaSchema;
    get formattedSchema() {
        return JSON.stringify(this.schema, null, "  ");
    }
    updateSchema = (value: any, isValid: boolean) => {
        try {
            this.schema = JSON.parse(value);
            this.setState({ schema: this.schema });
        } catch (error) {
            console.log(error);
        }
    }
    updateValue = (value: any, isValid: boolean) => {
        this.value = value;
        this.isValid = isValid;
        this.setState({ value: this.value });
    }
    render() {
        const valueHtml = hljs.highlight("json", JSON.stringify(this.value, null, "  ")).value;
        return (
            <div>
                <div style={{ float: "left", margin: "10px", width: "400px", overflowY: "scroll", height: "600px" }} className="bootstrap3-row-container">
                    <JSONEditor schema={this.schemaSchema}
                        initialValue={this.formattedSchema}
                        updateValue={this.updateSchema}
                        theme="bootstrap3"
                        icon="fontawesome4"
                        locale={this.locale}
                        dragula={dragula}
                        markdownit={MarkdownIt}
                        hljs={hljs}
                        forceHttps={false} />
                </div>
                <div style={{ width: "500px", margin: "10px", float: "left", overflowY: "scroll", height: "600px" }} className="bootstrap3-row-container">
                    <JSONEditor schema={this.schema}
                        initialValue={this.value}
                        updateValue={this.updateValue}
                        theme="bootstrap3"
                        icon="fontawesome4"
                        locale={this.locale}
                        dragula={dragula}
                        markdownit={MarkdownIt}
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
