import * as React from "react"
import { groupStyle } from "./common"

/**
 * @public
 */
export function ObjectEditor(props: {
  properties: Record<string, JSX.Element | (JSX.Element | undefined)[]>
  inline?: boolean
  readOnly?: boolean
}) {
  const children = Object.entries(props.properties).map(([title, child]) => {
    const newChild = Array.isArray(child)
      ? child.map((c, i) => c ? React.cloneElement(c, { key: i, readOnly: props.readOnly }) : null)
      : React.cloneElement(child, { readOnly: props.readOnly })
    return [title, newChild] as const
  })
  if (props.inline) {
    return (
      <table style={groupStyle}>
        <thead></thead>
        <tbody>
          {children.map(([title, child]) => (
            <tr key={title}>
              <td style={{ paddingRight: '5px' }}>{title}</td>
              <td style={{ display: 'flex', flexDirection: 'column' }}>{child}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return (
    <div style={groupStyle}>
      {children.map(([title, child]) => (
        <React.Fragment key={title}>
          <div style={{ marginTop: '5px', marginBottom: '5px' }}>{title}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>{child}</div>
        </React.Fragment>
      ))}
    </div>
  )
}
