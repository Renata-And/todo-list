import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { addTodolist, deleteTodolist } from "./todolistsSlice"
import { clearTasksAndTodolists } from "common/actions/common.actions"

export type TasksState = {
  [todolistId: string]: DomainTask[]
}

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

export const tasksSlice = createSliceWithThunks({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      fetchTasks: createAThunk(
        async (id: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.getTasks(id)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolistId: id, tasks: res.data.items }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
      removeTask: createAThunk(
        async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.deleteTask(payload)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return payload
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          },
        },
      ),
      addTask: createAThunk(
        async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.createTask(payload)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
          },
        },
      ),
      updateTask: createAThunk(
        async (payload: { task: DomainTask }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.updateTask({
              taskId: payload.task.id,
              todolistId: payload.task.todoListId,
              model: payload.task,
            })
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.task.todoListId]
            const index = tasks.findIndex((t) => t.id === action.payload.task.id)
            if (index !== -1) {
              tasks[index] = action.payload.task
              // tasks[index] = { ...tasks[index], ...action.payload.task }
            }
          },
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearTasksAndTodolists, (state, action) => {
        return action.payload.tasks
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { addTask, removeTask, updateTask, fetchTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
