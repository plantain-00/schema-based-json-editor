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

#### 2. angular2: updateValue

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
