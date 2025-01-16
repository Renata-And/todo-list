import type { AddTodolistActionType, ClearTodosData, DeleteTodolistActionType } from "./todolists-reducer"
import type { AppThunk } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { setAppStatusAC } from "../../../app/app-reducer"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"

export type TasksState = {
  [todolistId: string]: DomainTask[]
}

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: TasksActionType): TasksState => {
  switch (action.type) {
    case "GET_TASKS": {
      const { todolistId, tasks } = action.payload
      const stateCopy = { ...state }
      stateCopy[todolistId] = tasks
      return stateCopy
    }
    case "REMOVE_TASK": {
      const { taskId, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter((t) => t.id !== taskId),
      }
    }
    case "ADD_TASK": {
      const { task } = action.payload
      return {
        ...state,
        [task.todoListId]: [task, ...state[task.todoListId]],
      }
    }
    case "UPDATE_TASK": {
      const { task } = action.payload
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? task : t)),
      }
    }
    case "DELETE_TODOLIST": {
      const newState = { ...state }
      delete newState[action.payload.todolistId]
      return newState
    }
    case "ADD_TODOLIST": {
      debugger
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case "CLEAR_DATA":
      return {}
    default:
      return state
  }
}

// Action creators
export const getTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "GET_TASKS", payload } as const
}
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const
}
export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: "UPDATE_TASK", payload } as const
}

// Thunk
export const fetchTasksTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .getTasks(id)
      .then((res) => {
        dispatch(getTasksAC({ todolistId: id, tasks: res.data.items }))
        dispatch(setAppStatusAC("succeeded"))
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const removeTaskTC =
  (payload: { todolistId: string; taskId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .deleteTask(payload)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTaskAC(payload))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const addTaskTC =
  (payload: { todolistId: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .createTask(payload)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTaskAC({ task: res.data.data.item }))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const updateTaskTC =
  (payload: { task: DomainTask }): AppThunk =>
  (dispatch) => {
    const { task } = payload
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .updateTask({ taskId: task.id, todolistId: task.todoListId, model: task })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTaskAC({ task: res.data.data.item }))
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
type GetTasksActionType = ReturnType<typeof getTasksAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type TasksActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | DeleteTodolistActionType
  | AddTodolistActionType
  | GetTasksActionType
  | ClearTodosData
