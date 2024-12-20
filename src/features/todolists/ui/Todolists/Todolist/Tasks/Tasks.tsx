import List from "@mui/material/List"
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks"
import { Task } from "./Task/Task"
import { selectTasks } from "../../../../model/tasks-selectors"
import type { DomainTodolist } from "../../../../model/todolists-reducer"
import { useEffect } from "react"
import { fetchTasksTC } from "../../../../model/tasks-reducer"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/TaskStatus"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  let filteredTasks: DomainTask[] = tasks[todolist.id]
  switch (todolist.filter) {
    case "active":
      filteredTasks = filteredTasks.filter((t) => t.status === TaskStatus.New)
      break
    case "completed":
      filteredTasks = filteredTasks.filter((t) => t.status === TaskStatus.Completed)
      break
    case "firstThree":
      filteredTasks = filteredTasks.filter((t, i) => i === 0 || i === 1 || i === 2)
      break
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Tasks list is empty</p>
      ) : (
        <List className="tasks">
          {filteredTasks?.map((t: DomainTask) => <Task key={t.id} task={t} todolist={todolist} />)}
        </List>
      )}
    </>
  )
}
