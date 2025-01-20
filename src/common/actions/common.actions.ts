import { createAction } from "@reduxjs/toolkit"
import type { DomainTodolist } from "../../features/todolists/model/todolistsSlice"
import type { TasksState } from "../../features/todolists/model/tasksSlice"

export type ClearTasksAndTodolists = {
  todolists: DomainTodolist[]
  tasks: TasksState
}
export const clearTasksAndTodolists = createAction<ClearTasksAndTodolists>("common/clear_tasks_todolists")
