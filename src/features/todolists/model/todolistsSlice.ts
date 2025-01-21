import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { type RequestStatus, setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { fetchTasks } from "./tasksSlice"

export type FilterValuesType = "all" | "active" | "completed" | "firstThree"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}
const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

export const todolistsSlice = createSliceWithThunks({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      fetchTodolists: createAThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await todolistsApi.getTodolists()
            dispatch(setAppStatus({ status: "succeeded" }))
            res.data.forEach((tl) => {
              dispatch(fetchTasks(tl.id))
            })
            return { todolists: res.data }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload.todolists.forEach((todo) => {
              state.push({ ...todo, filter: "all", entityStatus: "idle" })
            })
          },
        },
      ),
      deleteTodolist: createAThunk(
        async (payload: { id: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            dispatch(changeTodolistEntityStatus({ id: payload.id, status: "loading" }))
            const res = await todolistsApi.removeTodolist(payload.id)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { id: payload.id }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            dispatch(changeTodolistEntityStatus({ id: payload.id, status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),
      addTodolist: createAThunk(
        async (payload: { title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await todolistsApi.createTodolist(payload.title)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { todolist: res.data.data.item }
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
            const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
            state.unshift(newTodolist)
          },
        },
      ),
      changeTodolistTitle: createAThunk(
        async (payload: { title: string; id: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await todolistsApi.updateTodolist(payload)
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
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),
      changeTodolistFilter: create.reducer<{ filter: FilterValuesType; id: string }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
      }),
      changeTodolistEntityStatus: create.reducer<{ status: RequestStatus; id: string }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state[index].entityStatus = action.payload.status
        }
      }),
    }
  },
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
  deleteTodolist,
  fetchTodolists,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
