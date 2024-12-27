import Input from "@mui/material/Input"
import React, { ChangeEvent, useState } from "react"

type EditableSpanProps = {
  value: string
  onChange: (changedTitle: string) => void
  className?: string
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, className, disabled }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [itemTitle, setItemTitle] = useState<string>(value)

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    onChange(itemTitle)
    setEditMode(false)
  }
  return editMode && !disabled ? (
    <Input value={itemTitle} onBlur={offEditMode} onChange={changeItemTitleHandler} autoFocus />
  ) : (
    <span onDoubleClick={onEditMode} className={className}>
      {value}
    </span>
  )
}
