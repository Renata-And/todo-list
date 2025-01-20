import type { AppThunk } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, deleteTodolist } from "./todolistsSlice"

export type TasksState = {
  [todolistId: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.task.id)
      if (index !== -1) {
        tasks[index] = action.payload.task
        // tasks[index] = { ...tasks[index], ...action.payload.task }
      }
    }),
    clearTasks: create.reducer(() => {
      return {}
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { addTask, clearTasks, removeTask, updateTask, setTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

// Thunk
export const fetchTasksTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .getTasks(id)
      .then((res) => {
        dispatch(setTasks({ todolistId: id, tasks: res.data.items }))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
export const removeTaskTC =
  (payload: { todolistId: string; taskId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .deleteTask(payload)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTask(payload))
          dispatch(setAppStatus({ status: "succeeded" }))
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
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .createTask(payload)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
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
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .updateTask({ taskId: task.id, todolistId: task.todoListId, model: task })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
