import * as React from "react"
import { Button } from "./button"
import { groupStyle } from "./common"

interface ArrayProps {
  add: () => void
  remove: (index: number) => void
  copy: (index: number) => void
  moveUp: (index: number) => void
  moveDown: (index: number) => void
}

/**
 * @public
 */
export function ArrayEditor(props: ArrayProps & {
  items: JSX.Element[]
  title?: (index: number) => string
  inline?: boolean
  readOnly?: boolean
}): JSX.Element {
  if (props.inline) {
    return (
      <div style={groupStyle}>
        <div>
          {props.items.map((p, i) => {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
                <div style={{ paddingRight: '5px', width: '14px' }}>{i + 1}</div>
                <div style={{ flex: 1, display: 'flex' }}>{React.cloneElement(p, { readOnly: props.readOnly })}</div>
                {!props.readOnly && <div>
                  <Button onClick={() => props.remove(i)}>{removeIcon}</Button>
                  <Button onClick={() => props.copy(i)}>{copyIcon}</Button>
                  {i > 0 && <Button onClick={() => props.moveUp(i)}>{topIcon}</Button>}
                  {i < props.items.length - 1 && <Button onClick={() => props.moveDown(i)}>{bottomIcon}</Button>}
                </div>}
              </div>
            )
          })}
        </div>
        {!props.readOnly && <Button onClick={props.add}>{addIcon}</Button>}
      </div>
    )
  }
  return (
    <div style={groupStyle}>
      {props.items.map((p, i) => {
        return (
          <React.Fragment key={i}>
            <div style={{ marginBottom: '5px', marginTop: '5px' }}>
              {props.title?.(i) ?? (i + 1)}
              {!props.readOnly && <Button style={{ marginLeft: '5px' }} onClick={() => props.remove(i)}>{removeIcon}</Button>}
              {!props.readOnly && <Button onClick={() => props.copy(i)}>{copyIcon}</Button>}
              {!props.readOnly && i > 0 && <Button onClick={() => props.moveUp(i)}>{topIcon}</Button>}
              {!props.readOnly && i < props.items.length - 1 && <Button onClick={() => props.moveDown(i)}>{bottomIcon}</Button>}
            </div>
            <div style={{ display: 'flex' }}>{React.cloneElement(p, { readOnly: props.readOnly })}</div>
          </React.Fragment>
        )
      })}
      {!props.readOnly && <Button onClick={props.add}>{addIcon}</Button>}
    </div>
  )
}

/**
 * @public
 */
export function ObjectArrayEditor(props: ArrayProps & {
  properties: Record<string, JSX.Element>[]
  readOnly?: boolean
}): JSX.Element | null {
  if (props.properties.length === 0) {
    return null
  }
  return (
    <div style={groupStyle}>
      <table>
        <thead>
          <tr>
            <td></td>
            {Object.entries(props.properties[0]).map(([title]) => <td key={title}>{title}</td>)}
            {!props.readOnly && <td></td>}
          </tr>
        </thead>
        <tbody>
          {props.properties.map((p, i) => {
            return (
              <tr key={i}>
                <td style={{ paddingRight: '5px' }}>{i + 1}</td>
                {Object.values(p).map((v, j) => <td key={j}>{React.cloneElement(v, { readOnly: props.readOnly })}</td>)}
                {!props.readOnly && <td>
                  <Button onClick={() => props.remove(i)}>{removeIcon}</Button>
                  <Button onClick={() => props.copy(i)}>{copyIcon}</Button>
                  {i > 0 && <Button onClick={() => props.moveUp(i)}>{topIcon}</Button>}
                  {i < props.properties.length - 1 && <Button onClick={() => props.moveDown(i)}>{bottomIcon}</Button>}
                </td>}
              </tr>
            )
          })}
        </tbody>
      </table>
      {!props.readOnly && <Button onClick={props.add}>{addIcon}</Button>}
    </div>
  )
}

const addIcon = <svg
  style={{
    width: '20px',
    height: '20px'
  }}
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg" >
  <path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path>
</svg>

const removeIcon = <svg
  style={{
    width: '20px',
    height: '20px'
  }}
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg"
>
  <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path>
</svg>

const topIcon = <svg
  style={{
    width: '20px',
    height: '20px'
  }}
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"></path>
</svg>

const bottomIcon = <svg
  style={{
    width: '20px',
    height: '20px'
  }}
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg"
>
  <path fill="currentColor" d="M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z"></path>
</svg>

const copyIcon = <svg
  style={{
    width: '20px',
    height: '20px'
  }}
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg"
>
  <path fill="currentColor" d="M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"></path>
</svg>
