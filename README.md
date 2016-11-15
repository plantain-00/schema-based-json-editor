[![Dependency Status](https://david-dm.org/plantain-00/schema-based-json-editor.svg)](https://david-dm.org/plantain-00/schema-based-json-editor)
[![devDependency Status](https://david-dm.org/plantain-00/schema-based-json-editor/dev-status.svg)](https://david-dm.org/plantain-00/schema-based-json-editor#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/schema-based-json-editor.svg?branch=master)](https://travis-ci.org/plantain-00/schema-based-json-editor)
[![npm version](https://badge.fury.io/js/schema-based-json-editor.svg)](https://badge.fury.io/js/schema-based-json-editor)
[![Downloads](https://img.shields.io/npm/dm/schema-based-json-editor.svg)](https://www.npmjs.com/package/schema-based-json-editor)

# schema-based-json-editor

#### install

`npm i schema-based-json-editor`

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
    updateValue={(value, isValid) => this.updateValue(value, isValid)}
    theme="bootstrap3"
    icon="fontawesome4"
    locale="zh-cn" />
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/react/index.html

the source code of the demo: https://github.com/plantain-00/schema-based-json-editor/tree/master/demo/react

#### angular2 component demo

```js
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, TitleEditorComponent, IconComponent } from "schema-based-json-editor/dist/angular/index";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, TitleEditorComponent, IconComponent],
    bootstrap: [MainComponent],
})
class MainModule { }
```

```jsx
<json-editor [schema]="schema"
    [initialValue]="value"
    (updateValue)="updateValue($event)"
    theme="bootstrap3"
    icon="fontawesome4"
    locale="zh-cn">
</json-editor>
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/angular/index.html

the source code of the demo: https://github.com/plantain-00/schema-based-json-editor/tree/master/demo/angular

#### vuejs component demo

```js
import "schema-based-json-editor/dist/vue/index";
```

```jsx
<json-editor :schema="schema"
    :initial-value="value"
    @update-value="updateValue(arguments[0])"
    theme="bootstrap3"
    icon="fontawesome4"
    locale="zh-cn">
</json-editor>
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/vue/index.html

the source code of the demo: https://github.com/plantain-00/schema-based-json-editor/tree/master/demo/vue

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
+ vuejs component
+ common schema fields: title, description, default, readonly
+ object schema fields: properties, required
+ array schema fields: items, minItems, uniqueItems
+ number and integer shema fields: minimum, exclusiveMinimum, maximum, exclusiveMaximum, enum
+ string schema fields: format, enum, minLength, maxLength, pattern

#### change logs

https://github.com/plantain-00/schema-based-json-editor/tree/master/change_logs.md
