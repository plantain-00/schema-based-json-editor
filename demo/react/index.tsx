import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor } from "../../src/react/index";

const schema = JSON.parse(`{
    "title": "Example Schema",
    "type": "array",
    "items": {
        "type": "object",
        "title": "Pet",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      }
}`);

class Main extends React.Component<{}, {}> {
    public value: any;
    public render() {
        return (
            <div>
                <button onClick={() => console.log(this.value)}>show data</button>
                <Editor schema={schema} keyName="root" initialValue={[{ name: "aaa" }]} updateValue={value => this.value = value} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
