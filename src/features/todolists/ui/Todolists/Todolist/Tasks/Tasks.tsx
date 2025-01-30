import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TaskStatus } from "common/enums/TaskStatus"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import type { DomainTask, DomainTodolist } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading } = useGetTasksQuery(todolist.id)

  let filteredTasks = data?.items
  switch (todolist.filter) {
    case "active":
      filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
      break
    case "completed":
      filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
      break
    case "firstThree":
      filteredTasks = filteredTasks?.filter((t, i) => i === 0 || i === 1 || i === 2)
      break
  }

  if (isLoading) {
    return <TasksSkeleton />
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
