import { ChangeEvent, KeyboardEvent, useState } from "react"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"
import TextField from "@mui/material/TextField"

type AddItemFormProps = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled }: AddItemFormProps) => {
  const [itemTitle, setItemTitle] = useState<string>("")

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }
  const KeyUpAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addItemHandler()
  }
  const addItemHandler = () => {
    if (itemTitle.trim()) {
      addItem(itemTitle)
      setItemTitle("")
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyUp={KeyUpAddItemHandler}
        label={"Enter a title"}
        disabled={disabled}
      />
      <IconButton onClick={addItemHandler} size="small" disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
