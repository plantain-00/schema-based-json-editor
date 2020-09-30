# change logs

## v 8.x

```ts
# v7
// vue 2
import 'vue-schema-based-json-editor'
# v8
// vue 3
import { ArrayEditor, ObjectEditor, JSONEditor } from "vue-schema-based-json-editor";
app.component('array-editor', ArrayEditor)
app.component('object-editor', ObjectEditor)
app.component('json-editor', JSONEditor)
```

## v 7.x

```bash
# v6
npm i schema-based-json-editor

# v7
npm i vue-schema-based-json-editor
npm i react-schema-based-json-editor
npm i angular-schema-based-json-editor
```

```ts
// v6
import "schema-based-json-editor/vue";
import { Select2 } from "schema-based-json-editor/react";
import { JSONEditor } from "schema-based-json-editor/angular";

// v7
import "vue-schema-based-json-editor";
import { JSONEditor } from "react-schema-based-json-editor";
import { JSONEditorModule } from "angular-schema-based-json-editor";
```

## v 6.x

```ts
// v5 angular AOT:
import { JSONEditorModule } from "schema-based-json-editor/angular";

// v6 angular AOT:
import { JSONEditorModule } from "schema-based-json-editor/aot/angular";
```

## v 5.x

```ts
// v5
import { JSONEditor } from "schema-based-json-editor/react";
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, IconComponent, OptionalComponent, DescriptionComponent } from "schema-based-json-editor/angular";
import "schema-based-json-editor/vue";

// v4
import { JSONEditor } from "schema-based-json-editor/dist/react";
import { JSONEditorComponent, BooleanEditorComponent, ArrayEditorComponent, EditorComponent, NullEditorComponent, NumberEditorComponent, ObjectEditorComponent, StringEditorComponent, IconComponent, OptionalComponent, DescriptionComponent } from "schema-based-json-editor/dist/angular";
import "schema-based-json-editor/dist/vue";
```

## v 4.x

```bash
// v4
locale is an object that can be imported dynamicly

// v3
locale is a string
```

## v 3.x

```ts
// before
import "schema-based-json-editor/dist/react/index";
import "schema-based-json-editor/dist/angular/index";
import "schema-based-json-editor/dist/vue/index";

// after
import "schema-based-json-editor/dist/react";
import "schema-based-json-editor/dist/angular";
import "schema-based-json-editor/dist/vue";
```

## v 2.x

### 1. reactjs: updateValue

```ts
// before
(value: any) => void

// after
(value: any, isValid: boolean) => void
```

### 2. angular: updateValue

```ts
// before
(value: any) => void

// after
(value: { value: any, isValid: boolean }) => void
```

### 3. vuejs: update-value

```ts
// before
(value: any) => void

// after
(value: { value: any, isValid: boolean }) => void
```
