import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from "@mui/material"
import { changeTodolistTitle, deleteTodolist, type DomainTodolist } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../../app/hooks"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitle({ id: todolist.id, title }))
  }
  const deleteTodolistHandler = () => {
    dispatch(deleteTodolist({ id: todolist.id }))
  }

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
