import React, { ButtonHTMLAttributes } from 'react'

// type ButtonPropsType = {
//   title: string
//   onClick: () => void
//   isDisabled?: boolean
// }

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  return (
    <button className={props.className} onClick={props.onClick} disabled={props.disabled}>{props.title}</button>
  )
}
