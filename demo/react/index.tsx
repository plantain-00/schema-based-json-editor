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

ReactDOM.render(<Editor schema={schema} />, document.getElementById("container"));
