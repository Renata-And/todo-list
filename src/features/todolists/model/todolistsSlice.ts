import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppThunk } from "../../../app/store"
import { type RequestStatus, setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { fetchTasks } from "./tasksSlice"

export type FilterValuesType = "all" | "active" | "completed" | "firstThree"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    deleteTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      state.unshift(newTodolist)
    }),
    changeTodolistFilter: create.reducer<{ filter: FilterValuesType; id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    changeTodolistTitle: create.reducer<{ title: string; id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ status: RequestStatus; id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach((todo) => {
        state.push({ ...todo, filter: "all", entityStatus: "idle" })
      })
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodolists, (state, action) => {
      return action.payload.todolists
    })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  setTodolists,
  deleteTodolist,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

// Thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todolists) => {
      todolists.forEach((tl) => {
        dispatch(fetchTasks(tl.id))
      })
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({ todolist: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
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
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ id, status: "loading" }))
    todolistsApi
      .removeTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(deleteTodolist({ id }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
        dispatch(changeTodolistEntityStatus({ id, status: "failed" }))
      })
  }
export const changeTodolistTitleTC =
  (payload: { title: string; id: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsApi
      .updateTodolist(payload)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitle(payload))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
