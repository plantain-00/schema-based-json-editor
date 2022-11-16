import * as React from "react"
import { Button } from "./button"

/**
 * @public
 */
export function DialogContainer(props: {
  children: JSX.Element
  readOnly?: boolean
}): JSX.Element {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>{editIcon}</Button>
      {visible && <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}
        onClick={() => setVisible(false)}
      >
        <div style={{ width: '600px', display: 'flex', background: 'white' }} onClick={(e) => e.stopPropagation()}>
          {React.cloneElement(props.children, { readOnly: props.readOnly })}
        </div>
      </div>}
    </>
  )
}

const editIcon = <svg
  style={{
    width: '20px',
    height: '20px'
  }}
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg"
>
  <path fill="currentColor" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"></path><path fill="currentColor" d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"></path>
</svg>
