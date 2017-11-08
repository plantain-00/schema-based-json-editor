### v 6.x

```ts
// v5 angular AOT:
import { JSONEditorModule } from "schema-based-json-editor/angular";

// v6 angular AOT:
import { JSONEditorModule } from "schema-based-json-editor/aot/angular";
```

### v 5.x

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

### v 4.x

```bash
// v4
locale is an object that can be imported dynamicly

// v3
locale is a string
```

### v 3.x

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

### v 2.x

#### 1. reactjs: updateValue

```ts
// before
(value: any) => void

// after
(value: any, isValid: boolean) => void
```

#### 2. angular: updateValue

```ts
// before
(value: any) => void

// after
(value: { value: any, isValid: boolean }) => void
```

#### 3. vuejs: update-value

```ts
// before
(value: any) => void

// after
(value: { value: any, isValid: boolean }) => void
```
