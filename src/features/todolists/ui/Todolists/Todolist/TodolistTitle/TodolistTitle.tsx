import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from "@mui/material"
import { type DomainTodolist } from "../../../../model/todolistsSlice"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()
  const deleteTodolistHandler = () => removeTodolist(todolist.id)
  const changeTodolistTitleHandler = (title: string) => updateTodolist({ id: todolist.id, title })

  return (
    <Typography variant="h5" component="h3" textAlign={"center"} style={{ margin: "5px 0 15px 0" }}>
      <EditableSpan
        value={todolist.title}
        onChange={changeTodolistTitleHandler}
        disabled={todolist.entityStatus === "loading"}
      />
      <IconButton aria-label="delete" onClick={deleteTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
