import { TaskPriority, TaskStatus } from "common/enums/TaskStatus"

export type BaseTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export type FullTask = BaseTask & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type getTasksResponse = {
  totalCount: number
  error: string | null
  items: FullTask[]
}
