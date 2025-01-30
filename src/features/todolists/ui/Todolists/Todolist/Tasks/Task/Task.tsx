import { Box } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { ChangeEvent } from "react"
import { TaskStatus } from "common/enums/TaskStatus"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import type { DomainTask, DomainTodolist } from "../../../../../lib/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }
  const setTaskNewStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const newTask = { ...task, status }
    updateTask({ todolistId: todolist.id, taskId: task.id, model: newTask })
  }
  const changeTaskTitle = (title: string) => {
    const newTask = { ...task, title }
    updateTask({ todolistId: todolist.id, taskId: task.id, model: newTask })
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
      <IconButton aria-label="delete" onClick={removeTaskHandler} size="small" disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
