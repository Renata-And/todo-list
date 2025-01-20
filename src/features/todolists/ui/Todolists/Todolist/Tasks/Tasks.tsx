import List from "@mui/material/List"
import { useAppSelector } from "../../../../../../app/hooks"
import { Task } from "./Task/Task"
import type { DomainTodolist } from "../../../../model/todolistsSlice"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/TaskStatus"
import { selectTasks } from "../../../../model/tasksSlice"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

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
