import Input from '@mui/material/Input'
import React, {ChangeEvent, useState} from 'react'

type EditableSpanProps = {
  value: string
  changeTitle: (changedTitle: string) => void
  className?: string
}

export const EditableSpan = ({value, changeTitle, className}: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemTitle, setItemTitle] = useState<string>(value);

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
      ? (<Input value={itemTitle} onBlur={offEditMode} onChange={changeItemTitleHandler} autoFocus/>)
      : (<span onDoubleClick={onEditMode} className={className}>{value}</span>)
  )
}
