[![Dependency Status](https://david-dm.org/plantain-00/schema-based-json-editor.svg)](https://david-dm.org/plantain-00/schema-based-json-editor)
[![devDependency Status](https://david-dm.org/plantain-00/schema-based-json-editor/dev-status.svg)](https://david-dm.org/plantain-00/schema-based-json-editor#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/schema-based-json-editor.svg?branch=master)](https://travis-ci.org/plantain-00/schema-based-json-editor)

# schema-based-json-editor

#### reactjs component

```js
import { JSONEditor } from "schema-based-json-editor/dist/react/index";
```

```
<JSONEditor schema={schema}
    initialValue={initialValue}
    updateValue={value => this.value = value}
    theme="bootstrap3"
    icon="fontawesome4"
    locale="zh-cn" />
```

#### todo list

+ object: propertyOrder, headerTemplate, fieldTemplate
+ array: minItems, uniqueItems
+ code edit
+ angular2 component
+ vuejs component
+ object and array filter
+ boolean format: "checkbox" and "select"
+ string format: "textarea" and options.input_height
+ array format: "tabs"
+ object and array: options.collapsed
