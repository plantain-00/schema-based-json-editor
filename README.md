[![Dependency Status](https://david-dm.org/plantain-00/schema-based-json-editor.svg)](https://david-dm.org/plantain-00/schema-based-json-editor)
[![devDependency Status](https://david-dm.org/plantain-00/schema-based-json-editor/dev-status.svg)](https://david-dm.org/plantain-00/schema-based-json-editor#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/schema-based-json-editor.svg?branch=master)](https://travis-ci.org/plantain-00/schema-based-json-editor)

# schema-based-json-editor

#### link or bundle styles of `dragula`

```
<link rel="stylesheet" href="node_modules/dragula/dist/dragula.min.css">
```

#### reactjs component demo

```js
import { JSONEditor } from "schema-based-json-editor/dist/react/index";
```

```jsx
<JSONEditor schema={schema}
    initialValue={initialValue}
    updateValue={value => this.value = value}
    theme="bootstrap3"
    icon="fontawesome4"
    locale="zh-cn" />
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/react/index.html

the source code of the demo: https://github.com/plantain-00/schema-based-json-editor/tree/master/demo/react

#### properties of the component

+ schema: the json schema object
+ initialValue: the initial json
+ updateValue: the function that is invoked when the json is edited in the editor
+ theme: optional, support "bootstrap3" for now
+ icon: optional, support "bootstrap3" and "fontawesome4" for now
+ locale: optional, support "zh-cn" for now
+ readonly: optional, a boolean value

#### features

+ reactjs component
+ angular2 component
+ common schema fields: title, description, default, readonly
+ object schema fields: properties, required
+ array schema fields: items, minItems, uniqueItems
+ number and integer shema fields: minimum, exclusiveMinimum, maximum, exclusiveMaximum, enum
+ string schema fields: format, enum, minLength, maxLength, pattern

#### todo list

+ object: propertyOrder, headerTemplate, fieldTemplate
+ code edit
+ angular2 component
+ vuejs component
+ object and array filter
+ boolean format: "checkbox" and "select"
+ string format: "textarea" and options.input_height
+ array format: "tabs"
+ object and array: options.collapsed
