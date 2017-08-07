[![Dependency Status](https://david-dm.org/plantain-00/schema-based-json-editor.svg)](https://david-dm.org/plantain-00/schema-based-json-editor)
[![devDependency Status](https://david-dm.org/plantain-00/schema-based-json-editor/dev-status.svg)](https://david-dm.org/plantain-00/schema-based-json-editor#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/schema-based-json-editor.svg?branch=master)](https://travis-ci.org/plantain-00/schema-based-json-editor)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/schema-based-json-editor?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/schema-based-json-editor/branch/master)
[![npm version](https://badge.fury.io/js/schema-based-json-editor.svg)](https://badge.fury.io/js/schema-based-json-editor)
[![Downloads](https://img.shields.io/npm/dm/schema-based-json-editor.svg)](https://www.npmjs.com/package/schema-based-json-editor)

# schema-based-json-editor

#### features

+ reactjs component
+ angular component
+ vuejs component
+ common schema fields: title, description, default, readonly, propertyOrder
+ object schema fields: properties, required, maxProperties, minProperties, collapsed
+ array schema fields: items, minItems, uniqueItems
+ number and integer shema fields: minimum, exclusiveMinimum, maximum, exclusiveMaximum, enum, multipleOf, collapsed
+ string schema fields: format, enum, minLength, maxLength, pattern
+ image preview, code highlight, markdown preview
+ multi-language

#### install

`npm i schema-based-json-editor`

#### reactjs component demo

```js
import { JSONEditor } from "schema-based-json-editor/react";
```

```jsx
<JSONEditor schema={schema}
    initialValue={initialValue}
    updateValue={this.updateValue}
    theme="bootstrap3"
    icon="fontawesome4">
</JSONEditor>
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/react/index.html

#### angular component demo

```js
import { JSONEditorModule } from "schema-based-json-editor/angular";

@NgModule({
    imports: [BrowserModule, FormsModule, JSONEditorModule],
    declarations: [MainComponent],
    bootstrap: [MainComponent],
})
class MainModule { }
```

```jsx
<json-editor [schema]="schema"
    [initialValue]="value"
    (updateValue)="updateValue($event)"
    theme="bootstrap3"
    icon="fontawesome4">
</json-editor>
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/angular/index.html

#### vuejs component demo

`npm i vue vue-class-component`

```js
import "schema-based-json-editor/vue";
```

```jsx
<json-editor :schema="schema"
    :initial-value="value"
    @update-value="updateValue($event)"
    theme="bootstrap3"
    icon="fontawesome4">
</json-editor>
```

the online demo: https://plantain-00.github.io/schema-based-json-editor/demo/vue/index.html

#### properties and events of the component

name | type | description
--- | --- | ---
schema | Schema | the json schema object
initialValue | ValueType | the initial json
updateValue | (value: ValueType or undefined, isValid: boolean) => void | the function that is invoked when the json is edited in the editor
theme | string? | support "bootstrap3" for now
icon | string? | support "bootstrap3" and "fontawesome4" for now
locale | Locale? | locale object
readonly | boolean? | readonly
dragula | object? | the `dragula` library object if you want to reorder array by drag and drop
markdownit | object? | the `markdown-it` library object if you want to preview markdown
hljs | object? | the `highlight.js` library object if you want to highlight code
forceHttps | boolean? | if true, the preview url of images will be `https://` rather than `http://`

#### change logs

https://github.com/plantain-00/schema-based-json-editor/tree/master/change_logs.md
