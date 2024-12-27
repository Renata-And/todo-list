import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppThunk } from "../../../app/store"
import { type RequestStatus, setAppStatusAC } from "../../../app/app-reducer"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"

export type FilterValuesType = "all" | "active" | "completed" | "firstThree"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: TodolistsActionType,
): DomainTodolist[] => {
  switch (action.type) {
    case "GET_TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    case "DELETE_TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todolistId)
    case "ADD_TODOLIST":
      const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      return [newTodolist, ...state]
    case "CHANGE_TODOLIST_TITLE":
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
    case "CHANGE_TODOLIST_FILTER":
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl))
    case "CHANGE_TODOLIST_STATUS":
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
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
export const addTodolistAC = (payload: { todolist: Todolist }) => {
  return { type: "ADD_TODOLIST", payload } as const
}
export const changeTodolistFilterAC = (payload: { filter: FilterValuesType; todolistId: string }) => {
  return { type: "CHANGE_TODOLIST_FILTER", payload } as const
}
export const changeTodolistTitleAC = (payload: { title: string; todolistId: string }) => {
  return { type: "CHANGE_TODOLIST_TITLE", payload } as const
}
export const changeTodolistEntityStatusAC = (payload: { id: string; status: RequestStatus }) => {
  return { type: "CHANGE_TODOLIST_STATUS", payload } as const
}

// Thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(getTodolistsAC(res.data))
      dispatch(setAppStatusAC("succeeded"))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolistAC({ todolist: res.data.data.item }))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const deleteTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC({ id, status: "loading" }))
    todolistsApi
      .removeTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(deleteTodolistAC(id))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const changeTodolistTitleTC =
  (payload: { title: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .updateTodolist(payload)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitleAC(payload))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

// Actions types
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type TodolistsActionType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType
  | GetTodolistsActionType
  | ChangeTodolistEntityStatusActionType
