# schema-based-json-editor

[![Dependency Status](https://david-dm.org/plantain-00/schema-based-json-editor.svg)](https://david-dm.org/plantain-00/schema-based-json-editor)
[![devDependency Status](https://david-dm.org/plantain-00/schema-based-json-editor/dev-status.svg)](https://david-dm.org/plantain-00/schema-based-json-editor#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/schema-based-json-editor.svg?branch=master)](https://travis-ci.org/plantain-00/schema-based-json-editor)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/schema-based-json-editor?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/schema-based-json-editor/branch/master)
[![npm version](https://badge.fury.io/js/schema-based-json-editor.svg)](https://badge.fury.io/js/schema-based-json-editor)
[![Downloads](https://img.shields.io/npm/dm/schema-based-json-editor.svg)](https://www.npmjs.com/package/schema-based-json-editor)

## features

+ reactjs component
+ angular component
+ vuejs component
+ common schema fields: title, description, default, readonly, propertyOrder, requiredWhen('===', 'in')
+ object schema fields: properties, required, maxProperties, minProperties, collapsed
+ array schema fields: items, minItems, uniqueItems
+ number and integer schema fields: minimum, exclusiveMinimum, maximum, exclusiveMaximum, enum, multipleOf
+ string schema fields: format('textarea' | 'color' | 'date' | 'datetime' | 'datetime-local' | 'time' | 'month' | 'email' | 'uri' | 'url' | 'week' | 'hostname' | 'ipv4' | 'ipv6' | 'code' | 'markdown' | 'base64'), enum, minLength, maxLength, pattern
+ image preview, code highlight, markdown preview
+ multi-language

## reactjs component

`npm i react-schema-based-json-editor`

```js
import { JSONEditor } from "react-schema-based-json-editor";
```

or

```html
<script src="./node_modules/react/umd/react.production.min.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.production.min.js"></script>
<script src="./node_modules/react-schema-based-json-editor/dist/react-schema-based-json-editor.min.js"></script>
```

```jsx
<JSONEditor schema={schema}
    initialValue={initialValue}
    updateValue={this.updateValue}
    theme="bootstrap3"
    icon="fontawesome4">
</JSONEditor>
```

the online demo: <https://plantain-00.github.io/schema-based-json-editor/packages/react/demo>

## angular component

`npm i angular-schema-based-json-editor`

```js
import { JSONEditorModule } from "angular-schema-based-json-editor";

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

the online demo: <https://plantain-00.github.io/schema-based-json-editor/packages/angular/demo/jit>

the AOT online demo: <https://plantain-00.github.io/schema-based-json-editor/packages/angular/demo/aot>

## vuejs component

`npm i vue-schema-based-json-editor`

```js
import "vue-schema-based-json-editor";
```

or

```html
<script src="./node_modules/vue/dist/vue.min.js"></script>
<script src="./node_modules/vue-class-component/dist/vue-class-component.min.js"></script>
<script src="./node_modules/vue-schema-based-json-editor/dist/vue-schema-based-json-editor.min.js"></script>
```

```jsx
<json-editor :schema="schema"
    :initial-value="value"
    @update-value="updateValue($event)"
    theme="bootstrap3"
    icon="fontawesome4">
</json-editor>
```

the online demo: <https://plantain-00.github.io/schema-based-json-editor/packages/vue/demo>

## properties and events of the component

name | type | description
--- | --- | ---
schema | Schema | the json schema object
initialValue | ValueType | the initial json
updateValue | (value: ValueType or undefined, isValid: boolean) => void | the function that is invoked when the json is edited in the editor
theme | string? | support "bootstrap3" "bootstrap4" "antd3" "element-ui2" "iview2" "blueprint1" for now
icon | string? | support "bootstrap3" "fontawesome4" "fontawesome5" "antd3" "element-ui2" "iview2" for now
locale | Locale? | locale object
readonly | boolean? | readonly
dragula | object? | the `dragula` library object if you want to reorder array by drag and drop
markdownit | object? | the `markdown-it` library object if you want to preview markdown
hljs | object? | the `highlight.js` library object if you want to highlight code
forceHttps | boolean? | if true, the preview url of images will be `https://` rather than `http://`

## improve current theme

You can find css classes like `schema-based-json-editor--*`, you can set their styles to improve UI

The full list of the classes are in:

```ts
export const defaultTheme = {
  card: 'schema-based-json-editor--card',
  row: 'schema-based-json-editor--row',
  input: 'schema-based-json-editor--input',
  textarea: 'schema-based-json-editor--textarea',
  button: 'schema-based-json-editor--button',
  description: 'schema-based-json-editor--description',
  errorRow: 'schema-based-json-editor--error-row',
  title: 'schema-based-json-editor--title',
  checkbox: 'schema-based-json-editor--checkbox',
  buttonGroup: 'schema-based-json-editor--button-group',
  radiobox: 'schema-based-json-editor--radiobox'
}
```

## support other themes / icons / locales

```ts
import { themes, icons, locales } from 'schema-based-json-editor'

themes['new-theme-name'] = { ... }
icons['new-icon-name'] = { ... }
locales['new-locale-name'] = { ... }
```

the data structure of new themes / icons / locales are just like default ones:

```ts
export const bootstrap3Icon = {
  isText: false,
  collapse: 'glyphicon glyphicon-chevron-down',
  expand: 'glyphicon glyphicon-chevron-right',
  add: 'glyphicon glyphicon-plus',
  delete: 'glyphicon glyphicon-remove'
}

export const defaultLocale = {
  button: {
    collapse: 'Collapse',
    expand: 'Expand',
    add: 'Add',
    delete: 'Delete'
  },
  error: {
    minLength: 'Value must be at least {0} characters long.',
    maxLength: 'Value must be at most {0} characters long.',
    pattern: "Value doesn't match the pattern {0}.",
    minimum: 'Value must be >= {0}.',
    maximum: 'Value must be <= {0}.',
    largerThan: 'Value must be > {0}.',
    smallerThan: 'Value must be < {0}.',
    minItems: 'The length of the array must be >= {0}.',
    uniqueItems: 'The item in {0} and {1} must not be same.',
    multipleOf: 'Value must be multiple value of {0}.',
    minProperties: 'Properties count must be >= {0}.',
    maxProperties: 'Properties count must be <= {0}.'
  },
  info: {
    notExists: 'not exists',
    true: 'true',
    false: 'false',
    search: 'search'
  },
  markdownTipLocale: defaultMarkDownTipLocale,
  fileUploaderLocale: defaultFileUploaderLocale
}
```

## change logs

<https://github.com/plantain-00/schema-based-json-editor/tree/master/change_logs.md>
