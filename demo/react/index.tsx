import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor } from "../../src/react/index";

const schema = JSON.parse(`{
    "title": "Example Schema",
    "type": "number"
}`);

class Main extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <button onClick={() => console.log((this.refs["value"] as Editor).state.value)}>show data</button>
                <Editor schema={schema} ref="value" />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
