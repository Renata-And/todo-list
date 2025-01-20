import { Box } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { ChangeEvent } from "react"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasksSlice"
import { useAppDispatch } from "../../../../../../../app/hooks"
import type { DomainTodolist } from "../../../../../model/todolistsSlice"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/TaskStatus"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }
  const setTaskNewStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const newTask = { ...task, status }
    dispatch(updateTaskTC({ task: newTask }))
  }
  const changeTaskTitle = (title: string) => {
    const newTask = { ...task, title }
    dispatch(updateTaskTC({ task: newTask }))
  }

  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem
      sx={{ justifyContent: "space-between", opacity: task.status === TaskStatus.Completed ? 0.5 : 1 }}
      disablePadding
    >
      <Box>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={setTaskNewStatus} disabled={disabled} />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitle}
          className={task.status === TaskStatus.Completed ? "titleDone" : ""}
          disabled={disabled}
        />
      </Box>
      <IconButton aria-label="delete" onClick={removeTask} size="small" disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
