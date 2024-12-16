import type { AddTodolistActionType, DeleteTodolistActionType } from "./todolists-reducer"
import type { AppThunk } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"

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
      return { ...state, [action.payload.todolist.id]: [] }
    }
    // case "DELETE_ALL_TASKS": {
    //   return {
    //     ...state,
    //     [action.todolistId]: [],
    //   }
    // }
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
// export const deleteAllTasksAC = (todolistId: string) => {
//   return { type: "DELETE_ALL_TASKS", todolistId } as const
// }

// Thunk
export const fetchTasksTC =
  (id: string): AppThunk =>
  (dispatch) => {
    tasksApi.getTasks(id).then((res) => {
      dispatch(getTasksAC({ todolistId: id, tasks: res.data.items }))
    })
  }
export const removeTaskTC =
  (payload: { todolistId: string; taskId: string }): AppThunk =>
  (dispatch) => {
    tasksApi.deleteTask(payload).then(() => {
      dispatch(removeTaskAC(payload))
    })
  }
export const addTaskTC =
  (payload: { todolistId: string; title: string }): AppThunk =>
  (dispatch) => {
    tasksApi.createTask(payload).then((res) => {
      dispatch(addTaskAC({ task: res.data.data.item }))
    })
  }
export const updateTaskTC =
  (payload: { task: DomainTask }): AppThunk =>
  (dispatch) => {
    const { task } = payload
    tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model: task }).then((res) => {
      dispatch(updateTaskAC({ task: res.data.data.item }))
    })
  }

// Actions types
type GetTasksActionType = ReturnType<typeof getTasksAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
// type DeleteAllTasksActionType = ReturnType<typeof deleteAllTasksAC>

type TasksActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | DeleteTodolistActionType
  | AddTodolistActionType
  | GetTasksActionType
// | DeleteAllTasksActionType
