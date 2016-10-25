import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor } from "../../src/react/index";

const schema = JSON.parse(`{
  "title": "Person",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "First and Last name",
      "minLength": 4,
      "default": "Jeremy Dorn"
    },
    "age": {
      "type": "integer",
      "default": 25,
      "minimum": 18,
      "maximum": 99
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
      }
    },
    "pets": {
      "type": "array",
      "format": "table",
      "title": "Pets",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "title": "Pet",
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
            "type": "string"
          }
        }
      },
      "default": [
        {
          "type": "dog",
          "name": "Walter"
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

const initialValue = {};

class Main extends React.Component<{}, {}> {
    public value: any;
    public render() {
        return (
            <div>
                <button onClick={() => console.log(this.value)}>show data</button>
                <Editor schema={schema}
                    initialValue={initialValue}
                    updateValue={value => this.value = value}
                    theme="bootstrap3"
                    icon="fontawesome4"
                    locale="zh-cn" />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
