import type { Todolist } from "./todolistsApi.types"
import type { BaseResponse } from "common/types/types"
import { instance } from "common/instance/instance"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  removeTodolist: (id: string) => {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
  updateTodolist: (payload: { todolistId: string; title: string }) => {
    const { todolistId, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${todolistId}`, { title })
  },
}
