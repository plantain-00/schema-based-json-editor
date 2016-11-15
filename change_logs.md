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
