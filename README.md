# schema-based-json-editor

[![Dependency Status](https://david-dm.org/plantain-00/schema-based-json-editor.svg)](https://david-dm.org/plantain-00/schema-based-json-editor)
[![devDependency Status](https://david-dm.org/plantain-00/schema-based-json-editor/dev-status.svg)](https://david-dm.org/plantain-00/schema-based-json-editor#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/schema-based-json-editor.svg?branch=master)](https://travis-ci.org/plantain-00/schema-based-json-editor)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/schema-based-json-editor?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/schema-based-json-editor/branch/master)
![Github CI](https://github.com/plantain-00/schema-based-json-editor/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/schema-based-json-editor.svg)](https://badge.fury.io/js/schema-based-json-editor)
[![Downloads](https://img.shields.io/npm/dm/schema-based-json-editor.svg)](https://www.npmjs.com/package/schema-based-json-editor)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fschema-based-json-editor%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/schema-based-json-editor)

## features

+ reactjs component
+ vuejs component
+ common schema fields: title, description, default, readonly, $ref, propertyOrder, requiredWhen, optionalWhen, className, propertyName
+ object schema fields: properties, required, maxProperties, minProperties, collapsed
+ array schema fields: items, minItems, uniqueItems, enum, enumTitles, format('select2')
+ number and integer schema fields: minimum, exclusiveMinimum, maximum, exclusiveMaximum, enum, multipleOf, enumTitles, format('select' | 'radiobox')
+ string schema fields: format('textarea' | 'color' | 'date' | 'datetime' | 'datetime-local' | 'time' | 'month' | 'email' | 'uri' | 'url' | 'week' | 'hostname' | 'ipv4' | 'ipv6' | 'code' | 'markdown' | 'base64' | 'select' | 'radiobox' | 'json'), enum, minLength, maxLength, pattern, enumTitles
+ boolean schema fields: format('checkbox' | 'select' | 'select2')
+ image preview, code highlight, markdown preview
+ multi-language

## reactjs component

[![gzip size](https://img.badgesize.io/https://unpkg.com/react-schema-based-json-editor?compression=gzip)](https://unpkg.com/react-schema-based-json-editor)

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

## vuejs component

[![gzip size](https://img.badgesize.io/https://unpkg.com/vue-schema-based-json-editor?compression=gzip)](https://unpkg.com/vue-schema-based-json-editor)

`npm i vue-schema-based-json-editor`

```js
import { ArrayEditor, ObjectEditor, JSONEditor } from "vue-schema-based-json-editor";
app.component('array-editor', ArrayEditor)
app.component('object-editor', ObjectEditor)
app.component('json-editor', JSONEditor)
```

or

```html
<script src="./node_modules/vue/dist/vue.min.js"></script>
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
theme | string? | support "bootstrap3" "bootstrap4" "antd3" "element-ui2" "iview2" "iview3" "blueprint1" "blueprint2" "blueprint3" for now
icon | string? | support "bootstrap3" "fontawesome4" "fontawesome5" "antd3" "element-ui2" "iview2" "iview3" for now
locale | Locale? | locale object
readonly | boolean? | readonly
dragula | object? | the `dragula` library object if you want to reorder array by drag and drop
markdownit | object? | the `markdown-it` library object if you want to preview markdown
hljs | object? | the `highlight.js` library object if you want to highlight code
forceHttps | boolean? | if true, the preview url of images will be `https://` rather than `http://`
disableCollapse | boolean? | if true, the collapse button will be hidden
noSelect2 | boolean? | if true, use `select` rather than `select2-component`
minItemCountIfNeedFilter | number? | default `6`(if item count > `6`, filter is visible, otherwise hidden), so if `0`, filter always visible, if `Infinity`, filter always hidden
monacoEditor | object? | the `monacoEditor` library object if you want to edit code with it

## improve current theme

You can find css classes like `schema-based-json-editor--*`, you can set their styles to improve UI

The full list of the classes are in:

```ts
export const defaultTheme = {
  card: 'schema-based-json-editor--card',
  row: 'schema-based-json-editor--row',
  errorRow: 'schema-based-json-editor--error-row',
  input: 'schema-based-json-editor--input',
  errorInput: 'schema-based-json-editor--error-input',
  textarea: 'schema-based-json-editor--textarea',
  errorTextarea: 'schema-based-json-editor--error-textarea',
  checkbox: 'schema-based-json-editor--checkbox',
  radiobox: 'schema-based-json-editor--radiobox',
  button: 'schema-based-json-editor--button',
  buttonGroup: 'schema-based-json-editor--button-group',
  title: 'schema-based-json-editor--title',
  description: 'schema-based-json-editor--description',
  select: 'schema-based-json-editor--select'
}
```

You can also set `className` in schema to get fine grained style control

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

## non-standard fields

field | type | description
--- | --- | ---
propertyOrder | number? | in a object, the property with smaller `propertyOrder` will be closer to the top
requiredWhen | [string, '===' or 'in' or 'isUndefined', any]? | in a object, the property is required when the condition is true, eg, `['name', '===', 'foo']` or `['name', 'in', ['foo', 'bar']]` or `['name', 'isUndefined']`, otherwise the property is hidden
optionalWhen | [string, '===' or 'in' or 'isUndefined', any]? | in a object, the property is optional when the condition is true, eg, `['name', '===', 'foo']` or `['name', 'in', ['foo', 'bar']]` or `['name', 'isUndefined']`, otherwise the property is hidden
collapsed | boolean? | if true, the object or array is collapsed by default
enumTitles | string[]? | works with `enum` field, are the titles of the enum
className | string? | custom class name
step | number? | in a string, works with format `time`
propertyName | string? | in a object, used as property name

## change logs

<https://github.com/plantain-00/schema-based-json-editor/tree/master/change_logs.md>
