import React, { ChangeEvent, useState } from 'react'

type EditableSpanProps = {
  title: string
  changeTitle: (changedTitle: string) => void
  className?: string
}

export const EditableSpan = ({ title, changeTitle, className }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemTitle, setItemTitle] = useState<string>(title);

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
  }
  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    changeTitle(itemTitle);
    setEditMode(false)
  }
  return (
    editMode
      ? (<input value={itemTitle} onBlur={offEditMode} onChange={changeItemTitleHandler} autoFocus />)
      : (<span onDoubleClick={onEditMode} className={className}>{title}</span>)
  )
}
