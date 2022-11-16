import * as React from "react"

export interface JsonEditorProps<T> {
  value: T
  setValue: (value: T) => void
  style?: React.CSSProperties
  readOnly?: boolean
}

export const controlStyle: React.CSSProperties = {
  outline: 0,
  padding: '0.375rem 0.75rem',
  fontSize: '1rem',
  fontWeight: 400,
  fontFamily: 'monospace',
  lineHeight: 1.5,
  color: '#212529',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #ced4da',
  appearance: 'none',
  borderRadius: '0.25rem',
  flex: 1,
  marginBottom: '3px',
}

export const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  fontWeight: 400,
  lineHeight: 1,
  color: '#212529',
  textAlign: 'center',
  textDecoration: 'none',
  verticalAlign: 'middle',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: 'transparent',
  border: '1px solid transparent',
  padding: '0.375rem 0.75rem',
  fontSize: '1rem',
  borderRadius: '0.25rem',
}

export const groupStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '0.25rem',
  flex: 1,
  marginBottom: '3px',
}

