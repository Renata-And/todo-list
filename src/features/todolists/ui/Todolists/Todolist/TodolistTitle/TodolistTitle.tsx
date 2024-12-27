import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from "@mui/material"
import { changeTodolistTitleTC, deleteTodolistTC, type DomainTodolist } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../app/hooks"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ todolistId: todolist.id, title }))
  }
  const deleteTodolist = () => {
    dispatch(deleteTodolistTC(todolist.id))
  }

  return (
    <Typography variant="h5" component="h3" textAlign={"center"} style={{ margin: "5px 0 15px 0" }}>
      <EditableSpan
        value={todolist.title}
        onChange={changeTodolistTitle}
        disabled={todolist.entityStatus === "loading"}
      />
      <IconButton aria-label="delete" onClick={deleteTodolist} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
