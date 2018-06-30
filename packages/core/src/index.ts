/// <reference path="./lib.d.ts" />
import toNumber from 'lodash.tonumber'
import toInteger from 'lodash.tointeger'
import isObject from 'lodash.isobject'
import isInteger from 'lodash.isinteger'
import { defaultLocale as defaultMarkDownTipLocale } from 'markdown-tip'
import { defaultLocale as defaultFileUploaderLocale } from 'file-uploader-component'
export { toNumber, toInteger }

import { __extends, __decorate, __assign } from 'tslib'
(window as any).__extends = __extends;
(window as any).__decorate = __decorate;
(window as any).__assign = __assign

import * as monaco from 'monaco-editor'

/**
 * @public
 */
export type MonacoEditor = typeof monaco.editor
/**
 * @public
 */
export type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor

/**
 * @public
 */
export type CommonSchema = {
  $schema?: string;
  title?: string;
  description?: string;
  default?: ValueType;
  readonly?: boolean;
  propertyOrder?: number;
  requiredWhen?: [string, '===' | 'in', any];
  optionalWhen?: [string, '===' | 'in', any];
  className?: string;
}

/**
 * @public
 */
export type ObjectSchema = CommonSchema & {
  type: 'object';
  properties: { [name: string]: Schema };
  required?: string[];
  maxProperties?: number;
  minProperties?: number;
  collapsed?: boolean;
}

/**
 * @public
 */
export type ArraySchema = CommonSchema & {
  type: 'array';
  items: Schema;
  minItems?: number;
  uniqueItems?: boolean;
  collapsed?: boolean;
  enum?: ValueType[];
  enumTitles?: string[];
  format?: 'select2';
}

/**
 * @public
 */
export type NumberSchema = CommonSchema & {
  type: 'number' | 'integer';
  minimum?: number;
  exclusiveMinimum?: boolean;
  maximum?: number;
  exclusiveMaximum?: boolean;
  enum?: number[];
  multipleOf?: number;
  enumTitles?: string[];
  format?: 'select' | 'radiobox';
}

/**
 * @public
 */
export type StringSchema = CommonSchema & {
  type: 'string';
  // tslint:disable-next-line:max-union-size
  format?: 'textarea' | 'color' | 'date' | 'datetime' | 'datetime-local' | 'time' | 'month' | 'email' | 'uri' | 'url' | 'week' | 'hostname' | 'ipv4' | 'ipv6' | 'code' | 'markdown' | 'base64' | 'select' | 'radiobox' | 'json';
  enum?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enumTitles?: string[];
}

/**
 * @public
 */
export type BooleanSchema = CommonSchema & {
  type: 'boolean';
  format?: 'checkbox' | 'select' | 'select2';
}

/**
 * @public
 */
export type NullSchema = CommonSchema & {
  type: 'null';
}

/**
 * @public
 */
export type Schema = ObjectSchema | ArraySchema | NumberSchema | StringSchema | BooleanSchema | NullSchema

/**
 * @public
 */
export const themes: { [name: string]: Theme } = {
  bootstrap3: {
    card: 'well',
    row: 'row',
    errorRow: 'row has-error',
    // tslint:disable-next-line:no-duplicate-string
    input: 'form-control',
    errorInput: 'form-control',
    textarea: 'form-control',
    errorTextarea: 'form-control',
    checkbox: 'checkbox pull-left',
    radiobox: 'radio-inline',
    button: 'btn btn-default',
    buttonGroup: 'btn-group',
    title: 'control-label',
    description: 'help-block',
    select: 'form-control'
  },
  bootstrap4: {
    card: 'card card-body',
    row: '',
    errorRow: 'text-danger',
    input: 'form-control',
    errorInput: 'form-control is-invalid',
    textarea: 'form-control',
    errorTextarea: 'form-control is-invalid',
    checkbox: '',
    radiobox: '',
    button: 'btn btn-default',
    buttonGroup: 'btn-group',
    title: 'col-form-label',
    description: 'form-text',
    select: 'form-control'
  },
  antd3: {
    card: 'ant-card ant-card-bordered ant-card-body',
    row: 'ant-row',
    errorRow: 'ant-row has-error',
    input: 'ant-input',
    errorInput: 'ant-input',
    textarea: 'ant-input',
    errorTextarea: 'ant-input',
    checkbox: 'ant-checkbox',
    radiobox: 'ant-radio',
    button: 'ant-btn',
    buttonGroup: 'ant-btn-group',
    title: 'ant-form-item-label',
    description: 'ant-form-explain',
    select: 'ant-input'
  },
  'element-ui2': {
    card: 'el-form el-card box-card el-card__body',
    row: 'el-form-item',
    errorRow: 'el-form-item is-error',
    // tslint:disable-next-line:no-duplicate-string
    input: 'el-input__inner',
    errorInput: 'el-input__inner',
    textarea: 'el-textarea__inner',
    errorTextarea: 'el-textarea__inner',
    button: 'el-button el-button--default el-button--small',
    buttonGroup: 'el-button-group',
    checkbox: 'el-checkbox',
    radiobox: 'el-radio',
    title: '',
    description: '',
    select: 'el-input__inner'
  },
  iview2: {
    card: 'ivu-card ivu-card-body',
    row: 'ivu-row',
    errorRow: 'ivu-row ivu-form-item-error',
    input: 'ivu-input',
    errorInput: 'ivu-input',
    textarea: 'ivu-input',
    errorTextarea: 'ivu-input',
    button: 'ivu-btn',
    buttonGroup: 'ivu-btn-group ivu-btn-group-small',
    checkbox: 'ivu-checkbox',
    radiobox: 'ivu-radio',
    title: 'ivu-form-item-label',
    description: '',
    select: 'ivu-input'
  },
  blueprint1: {
    card: 'pt-card',
    row: '',
    errorRow: '',
    // tslint:disable-next-line:no-duplicate-string
    input: 'pt-input pt-fill',
    errorInput: 'pt-input pt-fill',
    textarea: 'pt-input pt-fill',
    errorTextarea: 'pt-input pt-fill',
    button: 'pt-button',
    buttonGroup: 'pt-button-group',
    checkbox: 'pt-checkbox',
    radiobox: 'pt-radio',
    title: 'pt-label',
    description: 'pt-text-muted',
    select: 'pt-input pt-fill'
  },
  blueprint2: {
    card: 'pt-card',
    row: '',
    errorRow: '',
    input: 'pt-input pt-fill',
    errorInput: 'pt-input pt-fill',
    textarea: 'pt-input pt-fill',
    errorTextarea: 'pt-input pt-fill',
    button: 'pt-button',
    buttonGroup: 'pt-button-group',
    checkbox: 'pt-checkbox',
    radiobox: 'pt-radio',
    title: 'pt-label',
    description: 'pt-text-muted',
    select: 'pt-input pt-fill'
  }
}

/**
 * @public
 */
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

for (const themeName in themes) {
  for (const key in themes[themeName]) {
    themes[themeName][key as keyof Theme] += ' ' + defaultTheme[key as keyof Theme]
  }
}

/**
 * @public
 */
export type Theme = typeof defaultTheme

/**
 * @public
 */
export function getTheme(name: string | undefined | Theme): Theme {
  if (name === undefined) {
    return defaultTheme
  }
  if (typeof name === 'string') {
    return themes[name] || defaultTheme
  }
  return name
}

/**
 * @public
 */
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

export type Locale = typeof defaultLocale

/**
 * @public
 */
export const locales: { [name: string]: Locale } = {}

/**
 * @public
 */
export function getLocale(locale: undefined | null | Locale): Locale {
  return locale || defaultLocale
}

/**
 * @public
 */
export const bootstrap3Icon = {
  isText: false,
  collapse: 'glyphicon glyphicon-chevron-down',
  expand: 'glyphicon glyphicon-chevron-right',
  add: 'glyphicon glyphicon-plus',
  delete: 'glyphicon glyphicon-remove'
}

/**
 * @public
 */
export type Icon = typeof bootstrap3Icon

/**
 * @public
 */
export const icons: { [name: string]: Icon } = {
  bootstrap3: bootstrap3Icon,
  fontawesome4: {
    isText: false,
    collapse: 'fa fa-caret-square-o-down',
    expand: 'fa fa-caret-square-o-right',
    add: 'fa fa-plus',
    delete: 'fa fa-times'
  },
  fontawesome5: {
    isText: false,
    collapse: 'fas fa-caret-square-down',
    expand: 'fas fa-caret-square-right',
    add: 'fas fa-plus',
    delete: 'fas fa-times'
  },
  antd3: {
    isText: false,
    collapse: 'anticon anticon-down',
    expand: 'anticon anticon-right',
    add: 'anticon anticon-plus',
    delete: 'anticon anticon-close'
  },
  'element-ui2': {
    isText: false,
    collapse: 'el-icon-arrow-down',
    expand: 'el-icon-arrow-right',
    add: 'el-icon-plus',
    delete: 'el-icon-close'
  },
  iview2: {
    isText: false,
    collapse: 'ivu-icon ivu-icon-ios-arrow-down',
    expand: 'ivu-icon ivu-icon-ios-arrow-right',
    add: 'ivu-icon ivu-icon-ios-plus-empty',
    delete: 'ivu-icon ivu-icon-ios-close-empty'
  }
}

/**
 * @public
 */
export function getIcon(name: string | undefined | Icon, locale: Locale): Icon {
  if (name === undefined) {
    return {
      isText: true,
      collapse: locale.button.collapse,
      expand: locale.button.expand,
      add: locale.button.add,
      delete: locale.button.delete
    }
  }
  if (typeof name === 'string') {
    return icons[name] || {
      isText: true,
      collapse: locale.button.collapse,
      expand: locale.button.expand,
      add: locale.button.add,
      delete: locale.button.delete
    }
  }
  return name
}

/**
 * @public
 */
export type ValueType = { [name: string]: any } | any[] | number | boolean | string | null | undefined

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function getDefaultValue(required: boolean | undefined, schema: Schema, initialValue: ValueType | undefined): ValueType | undefined {
  if (initialValue !== undefined) {
    switch (schema.type) {
      case 'object':
        if (isObject(initialValue)) {
          return initialValue
        }
        break
      case 'array':
        if (Array.isArray(initialValue)) {
          return initialValue
        }
        break
      case 'number':
      case 'integer':
        if (typeof initialValue === 'number') {
          return initialValue
        }
        break
      case 'boolean':
        if (typeof initialValue === 'boolean') {
          return initialValue
        }
        break
      case 'string':
        if (typeof initialValue === 'string') {
          return initialValue
        }
        break
      case 'null':
      default:
        if (initialValue === null) {
          return initialValue
        }
    }
  }

  if (!required) {
    return undefined
  }

  if (schema.default !== undefined) {
    switch (schema.type) {
      case 'object':
        if (isObject(schema.default)) {
          return schema.default
        }
        break
      case 'array':
        if (Array.isArray(schema.default)) {
          return schema.default
        }
        break
      case 'number':
      case 'integer':
        if (typeof schema.default === 'number') {
          return schema.default
        }
        break
      case 'boolean':
        if (typeof schema.default === 'boolean') {
          return schema.default
        }
        break
      case 'string':
        if (typeof schema.default === 'string') {
          return schema.default
        }
        break
      case 'null':
      default:
        if (schema.default === null) {
          return schema.default
        }
    }
  }

  switch (schema.type) {
    case 'object':
      return {}
    case 'array':
      return []
    case 'number':
    case 'integer':
      if (schema.enum !== undefined && schema.enum.length > 0) {
        return schema.enum[0]
      } else {
        return 0
      }
    case 'boolean':
      return false
    case 'string':
      if (schema.enum !== undefined && schema.enum.length > 0) {
        return schema.enum[0]
      } else {
        return ''
      }
    case 'null':
    default:
      return null
  }
}

/**
 * @public
 */
export const buttonGroupStyle = { marginLeft: '10px' }
/**
 * @public
 */
export const buttonGroupStyleString = 'margin-left: 10px'

/**
 * @public
 */
export type Props<TSchema extends CommonSchema, TValue> = {
  schema: TSchema;
  initialValue: TValue;
  title?: string;
  updateValue: (value: TValue | undefined, isValid: boolean) => void;
  theme: Theme;
  icon: Icon;
  locale: Locale;
  onDelete?: () => void;
  readonly?: boolean;
  required?: boolean;
  dragula?: Dragula;
  md?: MarkdownIt;
  hljs?: HLJS;
  forceHttps?: boolean;
  disableCollapse?: boolean;
  noSelect2?: boolean;
  minItemCountIfNeedFilter?: number;
  monacoEditor?: MonacoEditor;
}

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function isSame(value1: ValueType, value2: ValueType) {
  if (typeof value1 === 'string'
    || typeof value1 === 'number'
    || typeof value1 === 'boolean'
    || value1 === null
    || value1 === undefined) {
    return value1 === value2
  }
  if (typeof value2 === 'string'
    || typeof value2 === 'number'
    || typeof value2 === 'boolean'
    || value2 === null
    || value2 === undefined) {
    return false
  }
  if (Array.isArray(value1)) {
    if (Array.isArray(value2) && (value1 as ValueType[]).length === (value2 as ValueType[]).length) {
      for (let i = 0; i < (value1 as ValueType[]).length; i++) {
        if (!isSame((value1 as ValueType[])[i], (value2 as ValueType[])[i])) {
          return false
        }
      }
      return true
    }
    return false
  }
  if (Array.isArray(value2)
    || Object.keys((value1 as { [name: string]: ValueType })).length !== Object.keys((value2 as { [name: string]: ValueType })).length) {
    return false
  }
  for (const key in value1) {
    if (value1.hasOwnProperty(key) && !isSame((value1 as { [name: string]: ValueType })[key], (value2 as { [name: string]: ValueType })[key])) {
      return false
    }
  }
  return true
}

/**
 * @public
 */
export function switchItem(value: any[], el: HTMLElement, sibling: HTMLElement | null) {
  const fromIndex = +el.dataset.index!
  if (sibling) {
    const toIndex = +sibling.dataset.index!
    value.splice(toIndex, 0, value[fromIndex])
    if (fromIndex > toIndex) {
      value.splice(fromIndex + 1, 1)
    } else {
      value.splice(fromIndex, 1)
    }
  } else {
    value.push(value[fromIndex])
    value.splice(fromIndex, 1)
  }
}

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function getErrorMessageOfArray(value: any[] | undefined, schema: ArraySchema, locale: Locale) {
  if (value !== undefined) {
    if (schema.minItems !== undefined) {
      if (value.length < schema.minItems) {
        return locale.error.minItems.replace('{0}', String(schema.minItems))
      }
    }
    if (schema.uniqueItems) {
      for (let i = 1; i < value.length; i++) {
        for (let j = 0; j < i; j++) {
          if (isSame(value[i], value[j])) {
            return locale.error.uniqueItems.replace('{0}', String(j)).replace('{1}', String(i))
          }
        }
      }
    }
  }
  return ''
}

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function getErrorMessageOfNumber(value: number | undefined, schema: NumberSchema, locale: Locale) {
  if (value !== undefined) {
    if (schema.minimum !== undefined) {
      if (schema.exclusiveMinimum) {
        if (value <= schema.minimum) {
          return locale.error.largerThan.replace('{0}', String(schema.minimum))
        }
      } else {
        if (value < schema.minimum) {
          return locale.error.minimum.replace('{0}', String(schema.minimum))
        }
      }
    }
    if (schema.maximum !== undefined) {
      if (schema.exclusiveMaximum) {
        if (value >= schema.maximum) {
          return locale.error.smallerThan.replace('{0}', String(schema.maximum))
        }
      } else {
        if (value > schema.maximum) {
          return locale.error.maximum.replace('{0}', String(schema.maximum))
        }
      }
    }
    if (schema.multipleOf && schema.multipleOf > 0) {
      if (!isInteger(value / schema.multipleOf)) {
        return locale.error.multipleOf.replace('{0}', String(schema.multipleOf))
      }
    }
  }
  return ''
}

/**
 * @public
 */
export function getErrorMessageOfString(value: string | undefined, schema: StringSchema, locale: Locale) {
  if (value !== undefined) {
    if (schema.minLength !== undefined
      && value.length < schema.minLength) {
      return locale.error.minLength.replace('{0}', String(schema.minLength))
    }
    if (schema.maxLength !== undefined
      && value.length > schema.maxLength) {
      return locale.error.maxLength.replace('{0}', String(schema.maxLength))
    }
    if (schema.pattern !== undefined
      && !new RegExp(schema.pattern).test(value)) {
      return locale.error.pattern.replace('{0}', String(schema.pattern))
    }
  }
  return ''
}

/**
 * @public
 */
export function getErrorMessageOfObject(value: { [name: string]: ValueType } | undefined, schema: ObjectSchema, locale: Locale) {
  if (value !== undefined) {
    let length = 0
    for (const key in value) {
      if (value.hasOwnProperty(key) && value[key] !== undefined) {
        length++
      }
    }
    if (schema.minProperties !== undefined
      && length < schema.minProperties) {
      return locale.error.minProperties.replace('{0}', String(schema.minProperties))
    }
    if (schema.maxProperties !== undefined
      && length > schema.maxProperties) {
      return locale.error.maxProperties.replace('{0}', String(schema.maxProperties))
    }
  }
  return ''
}

/**
 * @public
 */
export function toggleOptional(value: ValueType | undefined, schema: Schema, initialValue: any) {
  if (value === undefined) {
    return getDefaultValue(true, schema, initialValue)
  } else {
    return undefined
  }
}

/**
 * @public
 */
export type ValidityValue<T> = {
  value: T;
  isValid: boolean;
}

/**
 * @public
 */
export function recordInvalidPropertiesOfObject(invalidProperties: string[], isValid: boolean, property: string) {
  const index = invalidProperties.indexOf(property)
  if (isValid) {
    if (index !== -1) {
      invalidProperties.splice(index, 1)
    }
  } else {
    if (index === -1) {
      invalidProperties.push(property)
    }
  }
}

/**
 * @public
 */
export function recordInvalidIndexesOfArray(invalidIndexes: number[], isValid: boolean, i: number) {
  const index = invalidIndexes.indexOf(i)
  if (isValid) {
    if (index !== -1) {
      invalidIndexes.splice(index, 1)
    }
  } else {
    if (index === -1) {
      invalidIndexes.push(i)
    }
  }
}

const imageExtensions = ['.png', '.jpg', '.bmp', '.gif']

/**
 * @public
 */
export function isImageUrl(value?: string) {
  if (!value || value.length <= 'https://'.length) {
    return false
  }
  if (value.substr(0, 'http://'.length) !== 'http://'
    && value.substr(0, 'https://'.length) !== 'https://') {
    return false
  }
  const extensionName = value.substr(value.length - 4, 4)
  return imageExtensions.indexOf(extensionName) !== -1
}

/**
 * @public
 */
export function isBase64Image(value?: string) {
  if (!value) {
    return false
  }
  return value.indexOf(`data:image/`) === 0
    && value.indexOf(`;base64,`) !== -1
}

/**
 * @public
 */
export function replaceProtocal(src: string) {
  if (src.indexOf('http://') === 0 && src.indexOf('http://localhost') !== 0) {
    return 'https://' + src.substring('http://'.length)
  }
  return src
}

/**
 * @public
 */
export const imagePreviewStyleString = 'display: block; height: auto; margin: 6px 0; max-width: 100%;'
/**
 * @public
 */
export const imagePreviewStyle = {
  display: 'block',
  height: 'auto',
  margin: '6px 0',
  maxWidth: '100%'
}

function printInConsole(message: string) {
  console.log(message)
}

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function initializeMarkdown(markdownit: MarkdownItType | undefined, hljs: HLJS | undefined, forceHttps: boolean | undefined) {
  if (!markdownit) {
    return undefined
  }
  const md = markdownit({
    linkify: true,
    highlight: (str: string, lang: string) => {
      if (hljs) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre><code class="hljs ${lang}">${hljs.highlight(lang, str).value}</code></pre>`
          } catch (error) {
            printInConsole(error)
          }
        } else {
          try {
            return `<pre><code class="hljs">${hljs.highlightAuto(str).value}</code></pre>`
          } catch (error) {
            printInConsole(error)
          }
        }
      }
      return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
    }
  })

  md.renderer.rules.image = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => {
    const token = tokens[index]
    const aIndex = token.attrIndex('src')
    if (forceHttps) {
      token.attrs[aIndex][1] = replaceProtocal(token.attrs[aIndex][1])
    }
    token.attrPush(['style', imagePreviewStyleString])

    return md.renderer.rules.image(tokens, index, options, env, self)
  }

  let defaultLinkRender: TokenRender
  if (md.renderer.rules.link_open) {
    defaultLinkRender = md.renderer.rules.link_open
  } else {
    defaultLinkRender = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => {
      return self.renderToken(tokens, index, options)
    }
  }
  md.renderer.rules.link_open = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => {
    tokens[index].attrPush(['target', '_blank'])
    tokens[index].attrPush(['rel', 'nofollow'])
    return defaultLinkRender(tokens, index, options, env, self)
  }
  return md
}

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function findTitle(value: { [name: string]: ValueType } | undefined, properties: { property: string; schema: Schema }[]) {
  if (value) {
    for (const { property, schema } of properties) {
      const title = value[property]
      if (schema.type === 'number'
        || schema.type === 'integer'
        || schema.type === 'string') {
        if (schema.enum && schema.enumTitles) {
          const index = (schema.enum as (string | number)[]).indexOf(title as string | number)
          if (index !== -1 && index < schema.enumTitles.length) {
            const enumTitle = schema.enumTitles[index]
            if (typeof enumTitle === 'string' && enumTitle.length > 0) {
              if (enumTitle.length > 23) {
                return enumTitle.substring(0, 20) + '...'
              }
              return enumTitle
            }
          }
        }
      }
      if (typeof title === 'string' && title.length > 0) {
        if (title.length > 23) {
          return title.substring(0, 20) + '...'
        }
        return title
      }
    }
  }
  return undefined
}

// tslint:disable-next-line:cognitive-complexity
function findTitleFromSchema(value: { [name: string]: ValueType } | undefined, schema: ObjectSchema) {
  if (value) {
    for (const property in schema.properties) {
      if (schema.properties.hasOwnProperty(property)) {
        const title = value[property]
        if (typeof title === 'string' && title.length > 0) {
          if (title.length > 23) {
            return title.substring(0, 20) + '...'
          }
          return title
        }
      }
    }
  }
  return undefined
}

/**
 * @public
 */
export function getTitle(...titles: any[]) {
  for (const title of titles) {
    if (title === undefined || title === null) {
      continue
    }
    return String(title)
  }
  return ''
}

/**
 * @public
 */
export function compare(a: { property: string; schema: Schema }, b: { property: string; schema: Schema }) {
  if (typeof a.schema.propertyOrder === 'number') {
    if (typeof b.schema.propertyOrder === 'number') {
      return a.schema.propertyOrder - b.schema.propertyOrder
    }
    return -1
  }
  if (typeof b.schema.propertyOrder === 'number') {
    return 1
  }
  return 0
}

/**
 * @public
 */
export function filterObject({ property, schema }: { property: string; schema: Schema }, filterValue: string): boolean {
  return filterValue === ''
    || property.indexOf(filterValue) !== -1
    || (!!schema.title && schema.title.indexOf(filterValue) !== -1)
    || (!!schema.description && schema.description.indexOf(filterValue) !== -1)
}

/**
 * @public
 */
export function filterArray(value: ValueType, index: number, schema: Schema, filterValue: string): boolean {
  const result = filterValue === ''
    || String(index).indexOf(filterValue) !== -1
    || (schema.type === 'string' && (value as string).indexOf(filterValue) !== -1)
    || ((schema.type === 'number' || schema.type === 'integer') && String(value as number).indexOf(filterValue) !== -1)
  if (result) {
    return true
  }
  if (schema.type === 'object') {
    const title = getTitle(findTitleFromSchema(value as { [name: string]: ValueType }, schema), schema.title)
    return title.indexOf(filterValue) !== -1
  }
  return false
}

/**
 * @public
 */
export const minItemCountIfNeedFilter = 6

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function isRequired(
  required: string[] | undefined,
  value: { [name: string]: ValueType } | undefined,
  schema: ObjectSchema,
  property: string) {
  /**
   * return true: required
   * return undefined: optional
   * return false: hidden
   */
  if (required && required.some(r => r === property)) {
    return true
  }
  if (value && schema.properties[property]) {
    const requiredWhen = schema.properties[property].requiredWhen
    if (requiredWhen) {
      const [left, operator, right] = requiredWhen
      if (schema.properties[left]) {
        if (operator === '===') {
          return value[left] === right
        }
        if (operator === 'in') {
          return Array.isArray(right) && right.indexOf(value[left]) !== -1
        }
      }
    }

    const optionalWhen = schema.properties[property].optionalWhen
    if (optionalWhen) {
      const [left, operator, right] = optionalWhen
      if (schema.properties[left]) {
        if (operator === '===') {
          return value[left] === right ? undefined : false
        }
        if (operator === 'in') {
          return Array.isArray(right) && right.indexOf(value[left]) !== -1 ? undefined : false
        }
      }
    }
  }
  return undefined
}

/**
 * @public
 */
export function findContainer(childNodes: NodeList) {
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i]
    if (node.nodeName === 'DIV') {
      return node as HTMLElement
    }
  }
  return undefined
}

/**
 * @public
 */
export function getOptions(schema: NumberSchema | StringSchema | ArraySchema) {
  const enumTitles: string[] = schema.enumTitles || []
  return (schema.enum as (number | string)[]).map((e, i) => ({
    value: e,
    label: typeof enumTitles[i] === 'string' ? enumTitles[i] : e
  }))
}

import dragula from 'dragula'
import markdownit, { MarkdownIt, Token, TokenRender, Renderer } from 'markdown-it'
import hljs from 'highlight.js'

/**
 * @public
 */
export type Dragula = typeof dragula

export { MarkdownIt, Token, TokenRender, Renderer }

/**
 * @public
 */
export type HLJS = typeof hljs

/**
 * @public
 */
export type MarkdownItType = typeof markdownit
