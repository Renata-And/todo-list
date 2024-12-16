import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppThunk } from "../../../app/store"

export type FilterValuesType = "all" | "active" | "completed" | "firstThree"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: TodolistsActionType,
): DomainTodolist[] => {
  switch (action.type) {
    case "GET_TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    case "DELETE_TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todolistId)
    case "ADD_TODOLIST":
      return [action.payload.todolist, ...state]
    case "CHANGE_TODOLIST_TITLE":
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
    case "CHANGE_TODOLIST_FILTER":
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? {
              ...tl,
              filter: action.payload.filter,
            }
          : tl,
      )
    default:
      return state
  }
}

// Action creators
export const getTodolistsAC = (todolists: Todolist[]) => {
  return { type: "GET_TODOLISTS", todolists } as const
}
export const deleteTodolistAC = (todolistId: string) => {
  return { type: "DELETE_TODOLIST", payload: { todolistId } } as const
}
export const addTodolistAC = (payload: { todolist: DomainTodolist }) => {
  return { type: "ADD_TODOLIST", payload } as const
}
export const changeTodolistFilterAC = (payload: { filter: FilterValuesType; todolistId: string }) => {
  return { type: "CHANGE_TODOLIST_FILTER", payload } as const
}
export const changeTodolistTitleAC = (payload: { title: string; todolistId: string }) => {
  return { type: "CHANGE_TODOLIST_TITLE", payload } as const
}

// Thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(getTodolistsAC(res.data))
  })
}
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodo = res.data.data.item
      dispatch(addTodolistAC({ todolist: { ...newTodo, filter: "all" } }))
    })
  }
export const deleteTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    todolistsApi.removeTodolist(id).then(() => {
      dispatch(deleteTodolistAC(id))
    })
  }
export const changeTodolistTitleTC =
  (payload: { title: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    todolistsApi.updateTodolist(payload).then(() => {
      dispatch(changeTodolistTitleAC(payload))
    })
  }

// Actions types
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type TodolistsActionType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType
  | GetTodolistsActionType
