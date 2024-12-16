import type { TaskModel, getTasksResponse, DomainTask } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<getTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<
      BaseResponse<{
        item: DomainTask
      }>
    >(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: TaskModel }) {
    const { taskId, model, todolistId } = payload
    return instance.put<
      BaseResponse<{
        item: DomainTask
      }>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}