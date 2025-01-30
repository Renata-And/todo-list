import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from "@mui/material"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import { useAppDispatch } from "../../../../../../app/hooks"
import type { RequestStatus } from "../../../../../../app/appSlice"
import type { DomainTodolist } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, entityStatus, title } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolist] = useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      }),
    )
  }

  const deleteTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("failed")
      })
  }
  const changeTodolistTitleHandler = (title: string) => updateTodolist({ id: todolist.id, title })

  return (
    <Typography variant="h5" component="h3" textAlign={"center"} style={{ margin: "5px 0 15px 0" }}>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={entityStatus === "loading"} />
      <IconButton aria-label="delete" onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
