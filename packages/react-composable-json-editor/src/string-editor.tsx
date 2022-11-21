import * as React from "react"
import { controlStyle, JsonEditorProps } from "./common"

/**
 * @public
 */
export function StringEditor(props: JsonEditorProps<string> & {
  type?: React.HTMLInputTypeAttribute
  textarea?: boolean
}): JSX.Element {
  const [text, setText] = React.useState(props.value)
  React.useEffect(() => {
    setText(props.value)
  }, [props.value])
  const onComplete = () => {
    if (!props.readOnly && text !== props.value) {
      props.setValue(text)
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
  if (props.textarea) {
    return (
      <textarea
        value={text}
        disabled={props.readOnly}
        onChange={(e) => {
          if (props.readOnly) {
            return
          }
          setText(e.target.value)
        }}
        onKeyDown={(e) => {
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
        style={{ ...controlStyle, ...props.style, ...extraStyle }}
      />
    )
  }
  let preview: JSX.Element | undefined
  if (isImageUrl(props.value) || isBase64Image(props.value)) {
    preview = <img src={props.value} style={{ display: 'block', height: 'auto', margin: '6px 0px', maxWidth: '100%' }} />
  }
  return (
    <>
      <input
        value={text}
        disabled={props.readOnly}
        type={props.type ?? 'text'}
        onChange={(e) => {
          if (props.readOnly) {
            return
          }
          setText(e.target.value)
        }}
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
        style={{ ...controlStyle, ...props.style, ...extraStyle }}
      />
      {preview}
    </>
  )
}

const imageExtensions = ['.png', '.jpg', '.bmp', '.gif']

function isImageUrl(value?: string) {
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

function isBase64Image(value?: string) {
  if (!value) {
    return false
  }
  return value.indexOf(`data:image/`) === 0
    && value.indexOf(`;base64,`) !== -1
}
