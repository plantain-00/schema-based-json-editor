import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSONEditor } from "../../dist/react/index";

const schema = JSON.parse(`{
  "title": "Person",
  "type": "object",
  "required": ["name", "age", "location", "favorite_color", "pets"],
  "properties": {
    "name": {
      "type": "string",
      "description": "First and Last name",
      "minLength": 4,
      "maxLength": 20,
      "default": "Jeremy Dorn"
    },
    "age": {
      "type": "integer",
      "default": 25,
      "minimum": 18,
      "maximum": 99
    },
    "isOld": {
      "type": "boolean"
    },
    "favorite_color": {
      "type": "string",
      "format": "color",
      "title": "favorite color",
      "default": "#ffa500"
    },
    "gender": {
      "type": "string",
      "enum": [
        "male",
        "female"
      ]
    },
    "location": {
      "type": "object",
      "title": "Location",
      "properties": {
        "city": {
          "type": "string",
          "default": "San Francisco"
        },
        "state": {
          "type": "string",
          "default": "CA"
        },
        "citystate": {
          "type": "string",
          "description": "This is generated automatically from the previous two fields",
          "template": "{{city}}, {{state}}",
          "watch": {
            "city": "location.city",
            "state": "location.state"
          }
        }
      },
      "required": ["state"]
    },
    "pets": {
      "type": "array",
      "format": "table",
      "title": "Pets",
      "uniqueItems": true,
      "minItems": 1,
      "items": {
        "type": "object",
        "title": "Pet",
        "required": ["type", "name"],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "cat",
              "dog",
              "bird",
              "reptile",
              "other"
            ],
            "default": "dog"
          },
          "name": {
            "type": "string",
            "default": "test"
          }
        }
      },
      "default": [
        {
          "type": "dog",
          "name": "A"
        },
        {
          "type": "dog",
          "name": "B"
        }
      ]
    },
    "numbers": {
      "type": "array",
      "format": "table",
      "title": "Numbers",
      "uniqueItems": true,
      "items": {
        "type": "number",
        "title": "Number"
      }
    }
  }
}`);

class Main extends React.Component<{}, {}> {
    value: any = {};
    updateValue(value: any) {
        this.value = value;
        this.setState({ value: this.value });
    }
    render() {
        return (
            <div>
                <div style={{ width: "500px", margin: "10px", float: "left" }}>
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
