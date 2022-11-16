import * as React from "react"
import { controlStyle, JsonEditorProps } from "./common"

/**
 * @public
 */
export function NumberEditor(props: JsonEditorProps<number> & {
  type?: React.HTMLInputTypeAttribute
}): JSX.Element {
  const [text, setText] = React.useState(props.type === 'color' ? getColorString(props.value) : props.value.toString())
  React.useEffect(() => {
    setText(props.type === 'color' ? getColorString(props.value) : props.value.toString())
  }, [props.value])
  const onComplete = () => {
    if (props.readOnly) {
      return
    }
    let value: number
    if (props.type === 'color') {
      value = colorStringToNumber(text)
    } else {
      value = +text
    }
    if (!isNaN(value) && value !== props.value) {
      props.setValue(value)
    }
  }
  let extraStyle: React.CSSProperties = {}
  if (props.type === 'color') {
    extraStyle = {
      flex: 'unset',
      padding: 0,
    }
  }
  if (props.readOnly) {
    extraStyle.opacity = 0.5
  }
  return (
    <input
      value={text}
      type={props.type ?? 'number'}
      disabled={props.readOnly}
      onChange={(e) => {
        if (props.readOnly) {
          return
        }
        setText(e.target.value)
      }}
      style={{ ...controlStyle, ...props.style, ...extraStyle }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onComplete()
        }
        if (e.key === 'Escape') {
          return
        }
        e.stopPropagation()
      }}
      onBlur={() => {
        setTimeout(() => {
          onComplete()
        }, 0)
      }}
    />
  )
}

/**
 * @public
 */
export function colorStringToNumber(color: string): number {
  return +`0x${color.slice(1)}`
}

/**
 * @public
 */
export function getColorString(color: number, alpha?: number): string {
  const s = color.toString(16)
  let a = ''
  if (alpha !== undefined) {
    const f = Math.floor(alpha * 255).toString(16)
    a = '0'.repeat(2 - f.length) + f
  }
  return `#${'0'.repeat(6 - s.length)}${s}${a}`
}
