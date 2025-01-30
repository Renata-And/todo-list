import type { RequestStatus } from "../../../app/appSlice"
import { TaskPriority, TaskStatus } from "common/enums/TaskStatus"

export type FilterValues = "all" | "active" | "completed" | "firstThree"

export type Todolist = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type TaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export type DomainTask = TaskModel & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: DomainTask[]
}
