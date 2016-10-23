import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor } from "../../src/react/index";

const schema = JSON.parse(`{
    "title": "Example Schema",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "age": {
            "description": "Age in years",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": ["firstName", "lastName"]
}`);

class Main extends React.Component<{}, {}> {
    public value: any;
    public render() {
        return (
            <div>
                <button onClick={() => console.log(this.value)}>show data</button>
                <Editor schema={schema} keyName="root" initialValue={{}} updateValue={value => this.value = value} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
