import * as React from "react";
import { buttonStyle } from "./common";

/**
 * @public
 */
export function Button(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element {
  return <button {...props} style={{ ...buttonStyle, ...props.style }}> {props.children}</button >
}
