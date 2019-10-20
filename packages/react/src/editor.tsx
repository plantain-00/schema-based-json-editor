import * as React from 'react'
import * as common from 'schema-based-json-editor'
import { ObjectEditor } from './object-editor'
import { ArrayEditor } from './array-editor'
import { NumberEditor } from './number-editor'
import { BooleanEditor } from './boolean-editor'
import { NullEditor } from './null-editor'
import { StringEditor } from './string-editor'
import { AnyEditor } from './any-editor'

export class Editor extends React.Component<common.Props<common.Schema, common.ValueType>, {}> {
  render() {
    let props = this.props
    if (props.schema.$ref) {
      const reference = props.getReference(props.schema.$ref)
      if (reference) {
        props = { ...this.props, schema: reference }
      }
    }
    switch (props.schema.type) {
      case 'object':
        return <ObjectEditor {...props as common.Props<common.ObjectSchema, { [name: string]: common.ValueType }>} />
      case 'array':
        return <ArrayEditor {...props as common.Props<common.ArraySchema, common.ValueType[]>} />
      case 'number':
      case 'integer':
        return <NumberEditor {...props as common.Props<common.NumberSchema, number>} />
      case 'boolean':
        return <BooleanEditor {...props as common.Props<common.BooleanSchema, boolean>} />
      case 'null':
        return <NullEditor {...props as common.Props<common.NullSchema, null>} />
      case 'string':
        return <StringEditor {...props as common.Props<common.StringSchema, string>} />
      case undefined:
        return <AnyEditor {...props as common.Props<common.AnySchema, any>} />
      default:
        return null
    }
  }
}
