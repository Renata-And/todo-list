import React from 'react'

type ButtonPropsType = {
  title: string
  onClick: () => void
  isDisabled?: boolean
}

export const Button = ({ onClick, title, isDisabled }: ButtonPropsType) => {
  return (
    <button className='button' onClick={onClick} disabled={isDisabled}>{title}</button>
  )
}
